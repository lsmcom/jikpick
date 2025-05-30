package kr.it.code.main.item.dto;

import kr.it.code.main.item.entity.Item;
import kr.it.code.main.user.User;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Getter
public class ItemDto {

    private Long itemNo;
    private String itemName;
    private Integer itemCost;
    private String itemImage; // 대표 이미지
    private List<String> imagePathList; // 나머지 이미지들

    private Integer itemWish;
    private Long storeNo; // 첫 번째 storeNo만 가져옴

    private Integer pickPeriod;

    // 상세 페이지용 필드
    private String itemInfo;
    private String itemStatus;
    private LocalDate itemDate;

    private String sellerNick;
    private String categoryName;
    private List<String> imagePaths;
    private String pickStatus;

    private String sellerProfileImage; // 판매자 프로필 이미지
    private Float sellerRating; // 판매자 평점
    private Integer sellerRatingCount; // 판매자 리뷰 수
    private Integer sellerSaleCount; // 판매자 판매 상품 수

    // 생성자
    public ItemDto(Item item) {
        this.itemNo = item.getItemNo();
        this.itemName = item.getItemName();
        this.itemCost = item.getItemCost();

        // 이미지 리스트 분리
        this.imagePaths = item.getImagePathList() != null
                ? Arrays.asList(item.getImagePathList().split(","))
                : List.of();

        this.itemWish = item.getItemWish();

        // 첫 번째 지점 storeNo만 가져오기
        this.storeNo = item.getStores() != null && !item.getStores().isEmpty()
                ? item.getStores().iterator().next().getStoreNo()
                : null;

        this.itemInfo = item.getItemInfo();
        this.itemStatus = item.getItemStatus();
        this.itemDate = item.getItemDate();

        this.sellerNick = item.getUser().getNick();
        this.categoryName = item.getCategory().getCateName();
        this.pickStatus = item.getPickStatus();

        // 판매자 정보 추가
        User seller = item.getUser();
        if (seller != null) {
            this.sellerNick = seller.getNick();
            this.sellerProfileImage = seller.getImage(); // 판매자 프로필 이미지
            this.sellerRating = seller.getRating();
            this.sellerRatingCount = seller.getRatingCount();
            this.sellerSaleCount = seller.getSaleCount();
        }
    }

    // 검색이나 리스트용에서 사용되는 정적 팩토리 메서드
    public static ItemDto fromEntity(Item item) {
        return new ItemDto(item);
    }

    public String getPickStatus() {
        return pickStatus;
    }
}
