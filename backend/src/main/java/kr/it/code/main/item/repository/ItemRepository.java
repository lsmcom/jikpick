package kr.it.code.main.item.repository;

import kr.it.code.main.item.dto.PopularSubCategoryDto;
import kr.it.code.main.item.entity.Item;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // ✅ 상세 조회 시 연관 객체 즉시 로딩
    @EntityGraph(attributePaths = {"user", "category", "stores"})
    Optional<Item> findByItemNo(Long itemNo);

    // ✅ 카테고리 상품 목록도 연관 객체 함께 로딩
    @EntityGraph(attributePaths = {"user", "category"})
    List<Item> findByCategory_CateNo(Long cateNo);

    @EntityGraph(attributePaths = {"user", "category"})
    List<Item> findByCategoryCateNoIn(List<Long> cateNos);

    // ✅ 인기 소분류 카테고리 조회
    @Query("SELECT new kr.it.code.main.item.dto.PopularSubCategoryDto(" +
            "c.cateNo, c.cateName, SUM(i.itemWish)) " +
            "FROM Item i " +
            "JOIN i.category c " +
            "WHERE c.cateLevel = 3 " +
            "GROUP BY c.cateNo, c.cateName " +
            "ORDER BY SUM(i.itemWish) DESC")
    List<PopularSubCategoryDto> findTopSubCategoriesByWish();

    // ✅ 모든 상품을 stores 포함해서 정렬 조회
    @Query("SELECT i FROM Item i LEFT JOIN FETCH i.stores s LEFT JOIN FETCH i.category c LEFT JOIN FETCH i.user u ORDER BY i.itemWish DESC")
    List<Item> findAllWithStoresOrderByItemWishDesc();

    // ✅ 단순 정렬 조회 (EntityGraph 포함 시 category, user만 즉시 로딩)
    @EntityGraph(attributePaths = {"user", "category"})
    List<Item> findAllByOrderByItemWishDesc();

    //검색
    @Query("SELECT i FROM Item i " +
            "WHERE LOWER(i.itemName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(i.store.storeName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(i.category.cateName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(i.user.nick) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Item> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT i FROM Item i ORDER BY i.itemWish DESC")
    List<Item> findAllOrderByItemWishDesc();

    // User별 판매한 상품 개수 조회
    @Query("SELECT COUNT(i) FROM Item i WHERE i.user.userNo = :userNo")
    long countItemsByUser(Long userNo);

    // 판매자가 등록한 상품들을 조회
    List<Item> findByUserUserNo(Long userNo);  // User의 `userNo`로 아이템 조회

}
