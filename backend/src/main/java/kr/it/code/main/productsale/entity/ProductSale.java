package kr.it.code.main.productsale.entity;


import jakarta.persistence.*;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Table(name="product_sale")
@Getter
@Setter
public class ProductSale {

    @Id
    @Column(name = "sale_no")
    private Long saleNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "item_no")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_no")
    private Store store;

    @Column(name = "cate_no")
    private Long cateNo;

    @Column(name = "sale_date")
    private LocalDate saleDate;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "status")
    private String status;

}
