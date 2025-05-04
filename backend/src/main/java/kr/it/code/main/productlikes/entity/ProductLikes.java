package kr.it.code.main.productlikes.entity;


import jakarta.persistence.*;
import kr.it.code.main.item.entity.Item;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="product_likes")
@Getter
@Setter
public class ProductLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PL_ID")
    private Long plId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ITEM_NO")
    private Item item;  // "Item"과의 관계 설정

    @Column(name = "STORE_NO")
    private Long storeNo;

    @Column(name = "CATE_NO")
    private Long categoryNo;

    @Column(name = "USER_NO")
    private Long userNo;
}
