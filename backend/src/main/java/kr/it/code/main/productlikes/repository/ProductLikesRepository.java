package kr.it.code.main.productlikes.repository;

import kr.it.code.main.item.dto.ItemLikeDto;
import java.util.List;
import kr.it.code.main.productlikes.entity.ProductLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLikesRepository extends JpaRepository<ProductLikes, Long> {

    // ✅ 특정 상품의 좋아요 수
    long countByItem_ItemNo(Long itemNo);

    // ✅ 향후 기능 예시: 유저가 해당 상품에 좋아요 했는지
    boolean existsByUserNoAndItem_ItemNo(Long userNo, Long itemNo);
}
