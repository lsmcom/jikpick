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

    @Column(name = "USER_EMAIL", nullable = true)
    private String email;

    @Column(name = "USER_TELL", nullable = true)
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

    // ✅ 사용자 평점
    @Column(name = "USER_RATING")
    private Float rating;

    // 사용자 평점 수
    @Column(name = "RATING_COUNT")
    private Integer ratingCount;

    // 판매 상품 수
    @Column(name = "SALE_COUNT")
    private Integer saleCount;

    // 등록된 리뷰 수
    @Column(name = "REVIEW_COUNT")
    private Integer reviewCount;

    // 사용자 설명글
    @Column(name = "USER_INTRO")
    private String intro;

    @Column(name = "DEFAULT_PAYMENT_TYPE")
    private String defaultPaymentType;  // 예: toss, general

    @Column(name = "DEFAULT_PAYMENT_DETAIL")
    private String defaultPaymentDetail;  // 예: 네이버페이, 카카오페이 등

}
