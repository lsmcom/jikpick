package kr.it.code.main.user;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import kr.it.code.main.user.dto.FindIdRequestDto;
import kr.it.code.main.user.dto.JoinRequestDto;
import kr.it.code.main.user.dto.LoginRequestDto;
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

        return ResponseEntity.ok("로그인 성공");
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
}
