// ✅ [1] Store 엔티티 생성
// 📁 경로: src/main/java/kr/it/code/main/store/entity/Store.java

package kr.it.code.main.store.entity;

import jakarta.persistence.*;
import kr.it.code.main.region.entity.Region;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "store")
@Getter
@Setter
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STORE_NO")
    private Long storeNo;

    @Column(name = "STORE_NAME")
    private String storeName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REG_NO")
    private Region region;


    @Column(name = "STORE_TELL")
    private String storeTell;

    @Column(name = "STORE_TIME")
    private String storeTime;

    @Column(name = "STORE_ADDRESS")
    private String storeAddress;

    @Column(name = "LOT_ADDRESS")
    private String lotAddress;

    @Column(name = "ITEM_LOCATION")
    private String itemLocation;

    @Column(name = "STORE_MANAGER")
    private String storeManager;


}

