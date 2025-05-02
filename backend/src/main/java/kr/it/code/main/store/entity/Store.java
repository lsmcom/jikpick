// ✅ [1] Store 엔티티 생성
// 📁 경로: src/main/java/kr/it/code/main/store/entity/Store.java

package kr.it.code.main.store.entity;

import jakarta.persistence.*;
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

}

