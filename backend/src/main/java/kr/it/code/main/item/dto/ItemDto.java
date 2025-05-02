package kr.it.code.main.item.dto;

import kr.it.code.main.item.entity.Item;
import lombok.Getter;

@Getter
public class ItemDto {

    private Long itemNo;
    private String itemName;
    private Integer itemCost;
    private String itemImage;
    private Integer itemWish;
    private Long storeNo; // ✅ 추가

    public ItemDto(Item item) {
        this.itemNo = item.getItemNo();
        this.itemName = item.getItemName();
        this.itemCost = item.getItemCost();
        this.itemImage = item.getItemImage();
        this.itemWish = item.getItemWish();
        this.storeNo = item.getStore() != null ? item.getStore().getStoreNo() : null; // ✅ 지점 정보가 있을 경우만
    }
}
