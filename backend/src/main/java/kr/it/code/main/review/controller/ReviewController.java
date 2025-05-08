package kr.it.code.main.review.controller;

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

    // 리뷰 추가 API
    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestParam Long itemNo,
                                            @RequestParam Long userNo,
                                            @RequestParam String userId,
                                            @RequestParam String contents,
                                            @RequestParam String star) {
        // 리뷰 추가
        Review review = reviewService.addReview(itemNo, userNo, userId, contents, star);
        return ResponseEntity.ok(review);
    }

    // 상품에 대한 모든 리뷰 조회 API
    @GetMapping("/item/{itemNo}")
    public ResponseEntity<List<Review>> getReviewsByItem(@PathVariable Long itemNo) {
        List<Review> reviews = reviewService.getReviewsByItem(itemNo);
        return ResponseEntity.ok(reviews);
    }
}
