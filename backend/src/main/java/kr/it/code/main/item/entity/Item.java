package kr.it.code.main.item.entity;

import jakarta.persistence.*;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


import jakarta.persistence.*;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "item")
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ITEM_NO")
    private Long itemNo;

    // 사용자 정보 (FK)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

    // 카테고리 정보 (FK)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATE_NO")
    private Category category;
    // ...
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_NO", nullable = false)
    private Store store; // ✅ 대표 지점

    @ManyToMany
    @JoinTable(
            name = "item_store",
            joinColumns = @JoinColumn(name = "item_no"),
            inverseJoinColumns = @JoinColumn(name = "store_no")
    )
    private Set<Store> stores; // ✅ 희망 지점들
// ...

    @Column(name = "ITEM_NAME")
    private String itemName;

    @Column(name = "ITEM_COST")
    private Integer itemCost;

    @Column(name = "ITEM_INFO")
    private String itemInfo;

    @Column(name = "IMAGE_PATH_LIST", length = 2000)
    private String imagePathList; // Json 문자열로 저장

    @Column(name = "PICK_PERIOD")
    private Integer pickPeriod;  // 거래 유효기간 저장

    @Column(name = "ITEM_DATE")
    private LocalDate itemDate;

    @Column(name = "ITEM_WISH")
    private Integer itemWish;

    @Column(name = "ITEM_STATUS")
    private String itemStatus;

    @Column(name = "PICK_OPTION")
    private Boolean pickOption;

    @Column(name = "PICK_STATUS")
    private String pickStatus;

    // 첫 번째 이미지 경로를 반환하는 메소드
    public String getFirstImagePath() {
        if (imagePathList == null || imagePathList.isEmpty()) return null;
        return imagePathList.split(",")[0];  // 첫 번째 이미지 경로 반환
    }

    // 여러 지점 정보 반환
    public Set<Store> getStores() {
        // stores가 null인 경우 빈 Set을 반환하여 안전하게 처리
        return (this.stores != null && !this.stores.isEmpty()) ? this.stores : new HashSet<>();
    }

    // store 추가
    public void addStore(Store store) {
        if (this.stores == null) {
            this.stores = new HashSet<>();  // stores가 null이면 새로 초기화
        }
        this.stores.add(store);  // store 추가
    }

    // store 제거
    public void removeStore(Store store) {
        if (this.stores != null) {
            this.stores.remove(store);
        }
    }
}
