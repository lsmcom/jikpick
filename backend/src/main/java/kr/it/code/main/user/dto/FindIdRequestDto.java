package kr.it.code.main.user.dto;

import lombok.Getter;
import lombok.Setter;

// 📦 아이디 찾기 요청을 받을 DTO
@Getter
@Setter
public class FindIdRequestDto {
    private String name;   // 사용자 이름
    private String email;  // 사용자 이메일
}
