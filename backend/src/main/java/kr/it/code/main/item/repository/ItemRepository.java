package kr.it.code.main.item.repository;

import kr.it.code.main.item.entity.Item;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // ✅ 상세 조회 시 연관 객체 즉시 로딩
    @EntityGraph(attributePaths = {"user", "category", "store"})
    Optional<Item> findByItemNo(Long itemNo);

    // ✅ 카테고리 상품 목록도 연관 객체 함께 로딩 (중요!)
    @EntityGraph(attributePaths = {"user", "category"})
    List<Item> findByCategory_CateNo(Long cateNo);

    @EntityGraph(attributePaths = {"user", "category"})
    List<Item> findByCategoryCateNoIn(List<Long> cateNos);
}

