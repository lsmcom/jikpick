package kr.it.code.main.favorite.repository;

import kr.it.code.main.favorite.entity.Favorite;
import kr.it.code.main.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser_UserNo(Long userNo);

    boolean existsByItem_ItemNoAndUser_UserNo(Long itemNo, Long userNo);

    void deleteByItem_ItemNoAndUser_UserNo(Long itemNo, Long userNo);
}
