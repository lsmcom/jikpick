package kr.it.code.main.order.dto;

import kr.it.code.main.order.entity.Order;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderDto {
    private Long orderNo;
    private String itemName;
    private int itemCost;
    private String storeName;
    private String storeAddress;

    public OrderDto(Order order) {
        this.orderNo = order.getOrderNo();
        this.itemName = order.getItem().getItemName();
        this.itemCost = order.getItem().getItemCost();
        this.storeName = order.getStore() != null ? order.getStore().getStoreName() : null;
        this.storeAddress = order.getStore() != null ? order.getStore().getStoreAddress() : null;
    }
}
