package kr.it.code.main.item.repository;

import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.entity.Item;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    // 상품을 좋아요 수 기준으로 내림차순 정렬하여 가져오는 메소드
    @Query("SELECT new kr.it.code.main.item.dto.ItemLikeDto(i, COUNT(pl)) FROM Item i " +
            "LEFT JOIN ProductLikes pl ON i.itemNo = pl.item.itemNo " +
            "GROUP BY i.itemNo ORDER BY COUNT(pl) DESC")
    List<ItemLikeDto> findItemsOrderByLikeCount();

    // User별 판매한 상품 개수 조회
    @Query("SELECT COUNT(i) FROM Item i WHERE i.user.userNo = :userNo")
    long countItemsByUser(Long userNo);

    // User별로 등록한 Item 조회
    List<Item> findByUserUserNo(Long userNo);  // User의 `userNo`로 아이템 조회
}

