package kr.it.code.main.review.controller;

import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import kr.it.code.main.review.entity.Review;
import kr.it.code.main.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final ItemRepository itemRepository;

    // 판매자가 등록한 상품에 대한 모든 리뷰 조회 API
    @GetMapping("/seller/{userNo}")
    public ResponseEntity<List<Review>> getReviewsBySeller(@PathVariable Long userNo) {
        List<Review> reviews = reviewService.getReviewsBySeller(userNo);
        return ResponseEntity.ok(reviews);
    }
}
