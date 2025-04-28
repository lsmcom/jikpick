package kr.it.code.main.user;

import kr.it.code.main.user.dto.JoinRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Service // ✅ 서비스 계층을 나타내는 어노테이션
@RequiredArgsConstructor // ✅ 생성자 주입 자동 생성 (final 필드)
public class UserService {

    private final UserRepository userRepository; // ✅ 회원 데이터 접근 레포지토리
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // ✅ 비밀번호 암호화용 인스턴스

    // ✅ 생년월일(String)을 LocalDate로 변환하는 메서드
    private LocalDate convertToBirthDate(String birth) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
            return LocalDate.parse(birth, formatter);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("생년월일 형식이 올바르지 않습니다. (예: 990101)", e);
        }
    }

    // ✅ 아이디 사용 가능 여부 체크 메서드 추가
    public boolean checkIdAvailable(String id) {
        return !userRepository.existsById(id);
    }

    // ✅ 닉네임 사용 가능 여부 체크 추가
    public boolean checkNickAvailable(String nick) {
        return !userRepository.existsByNick(nick);
    }

    // ✅ 회원가입 처리 메서드
    public void join(JoinRequestDto dto) {
        // 아이디 중복 체크
        if (!checkIdAvailable(dto.getId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // 닉네임 중복 체크
        if (!checkNickAvailable(dto.getNick())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }

        // User 엔티티 생성 및 값 세팅
        User user = new User();
        user.setId(dto.getId());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // 비밀번호 암호화해서 저장
        user.setEmail(dto.getEmail());
        user.setNick(dto.getNick());
        user.setName(dto.getName());
        user.setBirth(convertToBirthDate(dto.getBirth())); // 생년월일 변환 후 저장
        user.setTell(dto.getTell());
        user.setAgency(dto.getAgency());
        user.setSex(dto.getSex());
        user.setNational(dto.getNational());

        // DB에 저장
        userRepository.save(user);
    }
}
