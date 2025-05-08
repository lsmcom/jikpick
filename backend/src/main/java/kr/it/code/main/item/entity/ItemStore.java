// 📁 src/main/java/kr/it/code/main/item/entity/ItemStore.java
package kr.it.code.main.item.entity;

import jakarta.persistence.*;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.store.entity.Store;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "item_store")
@IdClass(ItemStoreId.class)
@Getter
@Setter
public class ItemStore {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ITEM_NO")
    private Item item;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_NO")
    private Store store;
}

// 복합키 클래스
class ItemStoreId implements Serializable {
    private Long item;
    private Long store;

    // equals(), hashCode() 필수
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemStoreId)) return false;
        ItemStoreId that = (ItemStoreId) o;
        return item.equals(that.item) && store.equals(that.store);
    }

    @Override
    public int hashCode() {
        return item.hashCode() + store.hashCode();
    }
}
