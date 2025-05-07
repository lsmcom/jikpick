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


    // ✅ 상세 페이지용 필드 추가
    private Integer itemWish;
    private String itemInfo;
    private String itemStatus;
    private LocalDate itemDate;
    private String sellerNick;
    private String categoryName;
    private String pickStatus;

    public ItemDto(Item item) {
        this.itemNo = item.getItemNo();
        this.itemName = item.getItemName();
        this.itemCost = item.getItemCost();
        this.itemImage = item.getItemImage() != null
                ? item.getItemImage().replace("image/", "products/")
                : null;
        this.itemWish = item.getItemWish();


        // ✅ 추가 필드 값 주입
        this.itemInfo = item.getItemInfo();
        this.itemStatus = item.getItemStatus();
        this.itemDate = item.getItemDate();
        this.sellerNick = item.getUser().getNick();
        this.categoryName = item.getCategory().getCateName();
        this.pickStatus = item.getPickStatus();
    }

    public String getPickStatus() {
        return pickStatus;
    }

}
