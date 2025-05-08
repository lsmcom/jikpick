package kr.it.code.main.purchase.entity;

import jakarta.persistence.*;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "purchase")
@Getter
@Setter
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pur_no")
    private Long purNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne
    @JoinColumn(name = "item_no")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "store_no")
    private Store store;

    @Column(name = "cate_no")
    private Long cateNo;

    @Column(name = "pur_date")
    private LocalDate purDate;

    @Column(name = "user_id")
    private String userId;
}
