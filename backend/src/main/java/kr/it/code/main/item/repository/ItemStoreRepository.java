// 📁 src/main/java/kr/it/code/main/item/repository/ItemStoreRepository.java
package kr.it.code.main.item.repository;

import kr.it.code.main.item.entity.ItemStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemStoreRepository extends JpaRepository<ItemStore, Long> {

    // itemNo로 storeNo들만 추출
    @Query("SELECT s.store.storeNo FROM ItemStore s WHERE s.item.itemNo = :itemNo")
    List<Long> findStoreNosByItemNo(@Param("itemNo") Long itemNo);
}