package kr.it.code.main.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

// ✅ 회원 정보를 관리하는 엔티티 클래스
@Entity
@Table(name = "member") // DB의 'MEMBER' 테이블과 매핑
@Getter
@Setter
public class User {

    // ✅ 회원 번호 (기본키, 자동 증가)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_NO")
    private Long userNo;

    // ✅ 아이디
    @Column(name = "USER_ID")
    private String userId;

    // ✅ 비밀번호
    @Column(name = "USER_PW")
    private String password;

    // ✅ 이름
    @Column(name = "USER_NAME")
    private String name;

    // ✅ 닉네임
    @Column(name = "USER_NICK")
    private String nick;

    // ✅ 이메일
    @Column(name = "USER_EMAIL")
    private String email;

    // ✅ 전화번호
    @Column(name = "USER_TELL")
    private String tell;

    // ✅ 통신사
    @Column(name = "USER_AGENCY")
    private String agency;

    // ✅ 성별
    @Column(name = "USER_SEX")
    private String sex;

    // ✅ 내/외국인 구분
    @Column(name = "USER_NATIONAL")
    private String national;

    // ✅ 생년월일
    @Column(name = "USER_BIRTH")
    private LocalDate birth;

    // ✅ 프로필 이미지 (선택사항)
    @Column(name = "USER_IMAGE")
    private String image;

    // ✅ 사용자 평점 (선택사항)
    @Column(name = "USER_RATING")
    private Float rating;
}
