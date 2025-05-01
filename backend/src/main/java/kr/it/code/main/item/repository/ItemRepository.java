package kr.it.code.main.item.repository;

import kr.it.code.main.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // 단일 카테고리 상품 조회
    List<Item> findByCategory_CateNo(Long cateNo);

    // 여러 카테고리 상품 조회 (대분류 + 하위카테고리 전부 포함)
    List<Item> findByCategoryCateNoIn(List<Long> cateNos);
}

