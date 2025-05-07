package kr.it.code.main.user;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import kr.it.code.main.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@RestController // ✅ REST API용 컨트롤러
@RequestMapping("/api/users") // ✅ 모든 URL은 /api/users로 시작
@RequiredArgsConstructor // ✅ 생성자 주입 자동 생성 (final 필드)
public class UserController {

    private final UserService userService; // ✅ 회원가입 비즈니스 로직 담당 서비스
    private final UserRepository userRepository;

    // ✅ 회원가입 API (POST /api/users/join)
    @PostMapping("/join")
    public ResponseEntity<String> join(@Valid @RequestBody JoinRequestDto dto) {
        userService.join(dto); // ✅ 서비스에 회원가입 요청 위임
        return ResponseEntity.ok("회원가입 완료"); // ✅ 성공 시 200 OK + 메시지 반환
    }

    // ✅ 아이디 중복확인 API
    @PostMapping("/check-id")
    public ResponseEntity<Map<String, Boolean>> checkId(@RequestBody Map<String, String> request) {
        String userId = request.get("id");
        boolean available = userService.checkIdAvailable(userId);
        Map<String, Boolean> result = new HashMap<>();
        result.put("available", available);
        return ResponseEntity.ok(result);
    }

    // ✅ 닉네임 중복확인 API
    @PostMapping("/check-nick")
    public ResponseEntity<Map<String, Boolean>> checkNick(@RequestBody Map<String, String> request) {
        String nick = request.get("nick");
        boolean available = userService.checkNickAvailable(nick);
        Map<String, Boolean> result = new HashMap<>();
        result.put("available", available);
        return ResponseEntity.ok(result);
    }

    // ✅ 로그인 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto dto) {
        User user = userRepository.findByUserId(dto.getId()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        // ✅ 로그인 성공 시 사용자 정보 응답
        LoginResponseDto responseDto = new LoginResponseDto(
                user.getUserNo(),
                user.getUserId(),
                user.getNick()
        );

        return ResponseEntity.ok(responseDto);
    }

    // 🔥 로그아웃 API
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate(); // 세션 끊기
        return ResponseEntity.ok("로그아웃 완료");
    }

    // 🔥 아이디 찾기 API
    @PostMapping("/findId")
    public ResponseEntity<Map<String, Object>> findId(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");

        User user = userRepository.findByNameAndEmail(name, email);

        if (user != null) {
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("userId", user.getUserId());
            return ResponseEntity.ok(result);
        } else {
            Map<String, Object> result = new HashMap<>();
            result.put("success", false);
            result.put("message", "해당하는 회원을 찾을 수 없습니다.");
            return ResponseEntity.ok(result);
        }
    }

    // ✅ 비밀번호 찾기 API
    @PostMapping("/verify-user")
    public ResponseEntity<Map<String, Object>> verifyUser(@RequestBody Map<String, String> request) {
        String userId = request.get("id");
        String name = request.get("name");
        String email = request.get("email");

        User user = userRepository.findByUserIdAndNameAndEmail(userId, name, email);

        Map<String, Object> result = new HashMap<>();

        if (user != null && user.getName().equals(name) && user.getEmail().equals(email)) {
            result.put("success", true);
            return ResponseEntity.ok(result);
        } else {
            result.put("success", false);
            result.put("message", "일치하는 회원 정보가 없습니다.");
            return ResponseEntity.ok(result);
        }
    }

    // ✅ 비밀번호 재설정 API
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String newPassword = request.get("newPassword");

        User user = userRepository.findByUserId(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("사용자를 찾을 수 없습니다.");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok("비밀번호 변경 완료");
    }

    // ✅ 회원 탈퇴 API
    @DeleteMapping("/withdraw")
    public ResponseEntity<Map<String,Object>> withdraw(@RequestBody Map<String, String> req) {
        String userId = req.get("userId");
        String reason = req.get("reason");

        Map<String,Object> result = new HashMap<>();

        // 1) UserService 호출 전에 미리 조회
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            result.put("success", false);
            result.put("message", "사용자를 찾을 수 없습니다.");
            // 400 Bad Request 로 응답하거나 200 OK에 success=false 로 내려줄 수 있습니다
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(result);
        }

        // 2) 실제 탈퇴 로직 수행
        userService.withdraw(userId, reason);

        result.put("success", true);
        return ResponseEntity.ok(result);
    }

    // ✅ 사용자 정보 조회 API
    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(@RequestParam String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Map<String, Object> result = new HashMap<>();
        result.put("userId", user.getUserId());
        result.put("password", user.getPassword());
        result.put("nickname", user.getNick());
        result.put("email", user.getEmail());
        result.put("tell", user.getTell());
        result.put("rating", user.getRating());

        return ResponseEntity.ok(result);
    }

    // ✅ 회원 정보 수정 API
    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, Object> updates) {
        String userId = (String) updates.get("userId");

        if (userId == null) {
            return ResponseEntity.badRequest().body("userId는 필수입니다.");
        }

        try {
            userService.updateUserInfo(userId, updates);
            return ResponseEntity.ok("회원 정보가 수정되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("회원 정보 수정 중 오류 발생: " + e.getMessage());
        }
    }

    // ✅ 현재 비밀번호 확인 API
    @PostMapping("/check-password")
    public ResponseEntity<Boolean> checkPassword(@RequestBody Map<String, String> req) {
        String userId = req.get("userId");
        String inputPw = req.get("password");

        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) return ResponseEntity.status(404).body(false);

        boolean matches = new BCryptPasswordEncoder().matches(inputPw, user.getPassword());
        return ResponseEntity.ok(matches);
    }

    // 결제수단 저장 API
    @PostMapping("/{userNo}/payment-default")
    public ResponseEntity<Void> saveDefaultPayment(
            @PathVariable Long userNo,
            @RequestBody Map<String, String> payload
    ) {
        String paymentType = payload.get("paymentType");
        String paymentDetail = payload.get("paymentDetail");

        userService.saveDefaultPayment(userNo, paymentType, paymentDetail);
        return ResponseEntity.ok().build();
    }
}
