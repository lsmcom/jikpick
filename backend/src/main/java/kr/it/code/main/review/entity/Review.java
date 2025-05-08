package kr.it.code.main.review.entity;

import jakarta.persistence.*;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "review")
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_NO")
    private Long reviewNo;  // 리뷰번호

    @Column(name = "RE_CONTENTS")
    private String contents;  // 리뷰 내용

    @Column(name = "RE_DATE")
    private LocalDate date;  // 작성일

    @Column(name = "RE_STAR")
    private String star;  // 별점 (ENUM으로 1,2,3,4,5 값만 가능)

    @ManyToOne
    @JoinColumn(name = "USER_NO", referencedColumnName = "USER_NO")
    private User user;  // 리뷰 작성한 유저 (USER_NO는 'item' 테이블의 USER_NO를 참조)

    @ManyToOne
    @JoinColumn(name = "ITEM_NO", referencedColumnName = "ITEM_NO")
    private Item item;  // 리뷰를 달 상품 (ITEM_NO는 'item' 테이블의 ITEM_NO를 참조)
}
