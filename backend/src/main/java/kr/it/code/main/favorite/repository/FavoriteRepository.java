package kr.it.code.main.favorite.repository;

import kr.it.code.main.favorite.entity.Favorite;
import kr.it.code.main.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser_UserNo(Long userNo);

    boolean existsByItem_ItemNoAndUser_UserNo(Long itemNo, Long userNo);

    void deleteByItem_ItemNoAndUser_UserNo(Long itemNo, Long userNo);
    @Query("SELECT i FROM Item i ORDER BY i.itemWish DESC")
    List<Item> findAllOrderByItemWishDesc();

    // ✅ 유저의 관심목록 + item + item.user를 한번에 가져오기 (지연로딩 방지)
    @Query("SELECT f FROM Favorite f " +
            "JOIN FETCH f.item i " +
            "JOIN FETCH i.user " +
            "WHERE f.user.userNo = :userNo")

    List<Favorite> findWithItemAndUserByUserNo(@Param("userNo") Long userNo);
}
