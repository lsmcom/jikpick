package kr.it.code.main.favorite.entity;

import jakarta.persistence.*;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "FAVORITE")
@Getter
@Setter
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FAV_NO")
    private Long favNo;

    @ManyToOne
    @JoinColumn(name = "ITEM_NO")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "USER_NO")
    private User user;

    @Column(name = "USER_ID")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "CATE_NO", nullable = true)  // ✅ nullable 허용
    private Category category;
}
