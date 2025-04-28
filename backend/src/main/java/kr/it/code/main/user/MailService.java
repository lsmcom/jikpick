package kr.it.code.main.user;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    // 인증코드 발급
    public String sendEmail(String toEmail) {
        String code = generateCode();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("JIKPICK 회원가입 이메일 인증코드");
        message.setText("인증코드: " + code);

        mailSender.send(message);

        return code;
    }

    private String generateCode() {
        Random random = new Random();
        int num = random.nextInt(900000) + 100000; // 6자리
        return String.valueOf(num);
    }
}
