package kr.it.code.main.item.dto;

import kr.it.code.main.item.entity.Item;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ItemDto {

    private Long itemNo;
    private String itemName;
    private Integer itemCost;
    private String itemImage;
    private Integer itemWish;
    private Long storeNo; // ✅ 추가

    // ✅ 상세 페이지용 필드 추가
    private String itemInfo;
    private String itemStatus;
    private LocalDate itemDate;

    private String sellerNick;
    private String categoryName;

    public ItemDto(Item item) {
        this.itemNo = item.getItemNo();
        this.itemName = item.getItemName();
        this.itemCost = item.getItemCost();
        this.itemImage = item.getItemImage();
        this.itemWish = item.getItemWish();
        this.storeNo = item.getStore() != null ? item.getStore().getStoreNo() : null; // ✅ 지점 정보가 있을 경우만

        // ✅ 추가 필드 값 주입
        this.itemInfo = item.getItemInfo();
        this.itemStatus = item.getItemStatus();
        this.itemDate = item.getItemDate();

        this.sellerNick = item.getUser().getNick();
        this.categoryName = item.getCategory().getCateName();
    }
}
