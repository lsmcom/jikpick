package kr.it.code.main.item.entity;

import jakarta.persistence.*;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

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

    // 직픽 지점 정보 (FK)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_NO")
    private Store store;

    @Column(name = "ITEM_NAME")
    private String itemName;

    @Column(name = "ITEM_COST")
    private Integer itemCost;

    @Column(name = "ITEM_INFO")
    private String itemInfo;

    @Column(name = "IMAGE_PATH_LIST", length = 2000)
    private String imagePathList; //Json문자열로 저장
//
//    @Column(name = "ITEM_IMAGE")
//    private String itemImage; //대표이미지


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
}
