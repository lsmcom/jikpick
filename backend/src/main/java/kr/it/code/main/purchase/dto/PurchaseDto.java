package kr.it.code.main.purchase.dto;

import kr.it.code.main.purchase.entity.Purchase;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseDto {
    private Long itemNo;
    private String itemName;
    private int itemCost;
    private String storeName;
    private String sellerNick;
    private int itemWish; // ✅ OK
    private String itemImage; // ✅ OK
    private String pickStatus; // ✅ OK

    public PurchaseDto(Purchase purchase) {
        this.itemNo = purchase.getItem().getItemNo();
        this.itemName = purchase.getItem().getItemName();
        this.itemCost = purchase.getItem().getItemCost();
        this.storeName = purchase.getStore().getStoreName();
        this.sellerNick = purchase.getItem().getUser().getNick();
        this.itemWish = purchase.getItem().getItemWish();           // ← item 테이블에서
        this.itemImage = purchase.getItem().getImagePathList();     // ← item 테이블에서
        this.pickStatus = purchase.getItem().getPickStatus();       // ← item 테이블에서
        System.out.println("💬 DTO 생성 확인: " + itemName + ", " + storeName + ", " + pickStatus);
    }
}
