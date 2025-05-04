package kr.it.code.main.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private Long userNo;
    private String id;
    private String nick;

    public LoginResponseDto(Long userNo, String id, String nick) {
        this.userNo = userNo;
        this.id = id;
        this.nick = nick;
    }
}
