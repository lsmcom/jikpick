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

    public ItemDto(Item item) {
        this.itemNo = item.getItemNo();
        this.itemName = item.getItemName();
        this.itemCost = item.getItemCost();
        this.itemImage = item.getItemImage();
        this.itemWish = item.getItemWish();
    }

}
