package kr.it.code.main.item.entity;

import jakarta.persistence.*;
import kr.it.code.main.category.entity.Category;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATE_NO")
    private Category category;

    @Column(name = "ITEM_NAME")
    private String itemName;

    @Column(name = "ITEM_COST")
    private Integer itemCost;

    @Column(name = "ITEM_INFO")
    private String itemInfo;

    @Column(name = "ITEM_IMAGE")
    private String itemImage;

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
