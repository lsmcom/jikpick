package kr.it.code.main.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @PostMapping("/send-email")
    public ResponseEntity<Map<String, String>> sendEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = mailService.sendEmail(email); // 이메일 보내고 인증번호 생성

        Map<String, String> result = new HashMap<>();
        result.put("code", code); // 🔥 인증번호를 JSON 형태로 보내줌
        return ResponseEntity.ok(result);
    }
}