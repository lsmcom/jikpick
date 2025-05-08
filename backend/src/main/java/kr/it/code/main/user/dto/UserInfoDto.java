package kr.it.code.main.user.dto;

import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDto {

    private Long userNo;
    private String nickname;
    private Float rating;
    private Integer ratingCount;
    private Integer reviewCount;
    private Integer saleCount;
    private String intro;
    private String image;

    public UserInfoDto(User user) {
        this.userNo = user.getUserNo();
        this.nickname = user.getNick();
        this.rating = user.getRating();
        this.ratingCount = user.getRatingCount();
        this.reviewCount = user.getReviewCount();
        this.saleCount = user.getSaleCount();
        this.intro = user.getIntro();
        this.image = user.getImage();
    }
}
