package kr.it.code.main.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequestDto {

    private String id;       // ✅ 비밀번호를 바꿀 사용자 아이디
    private String newPassword;  // ✅ 새 비밀번호

}
