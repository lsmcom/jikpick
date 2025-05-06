package kr.it.code.main.store.entity;

import jakarta.persistence.*;
import kr.it.code.main.region.entity.Region;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "STORE")
@Getter
@Setter
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STORE_NO")
    private Long storeNo;

    @Column(name = "STORE_NAME")
    private String storeName;

    @Column(name = "STORE_TELL")
    private String storeTell;

    @Column(name = "STORE_TIME")
    private String storeTime;

    @Column(name = "STORE_ADDRESS")
    private String storeAddress;

    @Column(name = "ITEM_LOCATION")
    private String itemLocation;

    @Column(name = "STORE_MANAGER")
    private String storeManager;

//    @Column(name = "STORE_TYPE")
//    private String storeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reg_no")
    private Region region;
}
