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
    private String itemInfo;
    private String itemStatus;
    private LocalDate itemDate;
    private String sellerNick;
    private String categoryName;

    public ItemDto(Item item) {
        this.itemNo = item.getItemNo();
        this.itemName = item.getItemName();
        this.itemCost = item.getItemCost();
        this.itemImage = item.getItemImage().replace("uploads/images/", "");
        this.itemWish = item.getItemWish();
        this.itemInfo = item.getItemInfo();
        this.itemStatus = item.getItemStatus();
        this.itemDate = item.getItemDate();
        this.sellerNick = item.getUser().getNick();
        this.categoryName = item.getCategory().getCateName();
    }

}
