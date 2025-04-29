package kr.it.code.main.user.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

// ✅ 회원가입 요청을 받을 때 사용하는 DTO 클래스
@Getter
@Setter
public class JoinRequestDto {

    // ✅ 아이디 (필수 입력)
    @NotBlank(message = "아이디는 필수 입력값입니다.")
    private String id;

    // ✅ 비밀번호 (필수 입력, 6~50자)
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    @Size(min = 6, max = 50, message = "비밀번호는 6자 이상 50자 이하로 입력해주세요.")
    private String password;

    // ✅ 이름 (필수 입력)
    @NotBlank(message = "이름은 필수 입력값입니다.")
    private String name;

    // ✅ 닉네임 (필수 입력)
    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nick;

    // ✅ 이메일 (필수 입력, 이메일 형식 검증)
    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;

    // ✅ 전화번호 (필수 입력, 숫자 9~11자리 검증)
    @NotBlank(message = "전화번호는 필수 입력값입니다.")
    @Pattern(regexp = "\\d{9,11}", message = "전화번호는 숫자만 9~11자리로 입력해주세요.")
    private String tell;

    // ✅ 통신사 (필수 입력)
    @NotBlank(message = "통신사는 필수 입력값입니다.")
    private String agency;

    // ✅ 성별 (필수 입력)
    @NotBlank(message = "성별은 필수 입력값입니다.")
    private String sex;

    // ✅ 내/외국인 구분 (필수 입력)
    @NotBlank(message = "내외국인 여부는 필수 입력값입니다.")
    private String national;

    // ✅ 생년월일 (필수 입력, 6자리 숫자 YYMMDD 형식 검증)
    @NotBlank(message = "생년월일은 필수 입력값입니다.")
    @Pattern(regexp = "\\d{6}", message = "생년월일은 6자리 숫자(YYMMDD)로 입력해야 합니다.")
    private String birth;
}
