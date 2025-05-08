package kr.it.code.main.review.repository;

import kr.it.code.main.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // 특정 상품에 대한 리뷰 목록 조회
    List<Review> findByItem_ItemNo(Long itemNo);

    // 리뷰 작성자의 아이디로 리뷰 조회
    List<Review> findByUser_UserId(String userId);
}
