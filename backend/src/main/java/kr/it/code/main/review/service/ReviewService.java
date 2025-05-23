package kr.it.code.main.review.service;

import kr.it.code.main.review.entity.Review;
import kr.it.code.main.review.repository.ReviewRepository;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.user.User;
import kr.it.code.main.user.UserRepository;
import kr.it.code.main.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    // 상품에 대한 리뷰 추가
    public Review addReview(Long itemNo, Long userNo, String userId, String contents, String star) {
        // 상품과 유저 정보 가져오기
        Item item = itemRepository.findById(itemNo).orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));
        User user = userRepository.findById(userNo).orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        // 리뷰 객체 생성
        Review review = new Review();
        review.setItem(item);
        review.setUser(user);
        review.setContents(contents);
        review.setStar(star);  // 1, 2, 3, 4, 5 값 중 하나
        review.setDate(LocalDate.now());  // 현재 날짜로 설정

        return reviewRepository.save(review);
    }

    // 판매자가 등록한 상품에 대해 작성된 리뷰를 가져오는 메서드
    public List<Review> getReviewsBySeller(Long sellerUserNo) {
        List<Item> items = itemRepository.findByUserUserNo(sellerUserNo); // 판매자가 등록한 상품 목록

        if (items.isEmpty()) {
            throw new IllegalArgumentException("판매자가 등록한 상품이 없습니다.");
        }

        // 해당 상품에 대한 모든 리뷰를 가져오기
        List<Long> itemNoList = items.stream().map(Item::getItemNo).collect(Collectors.toList());
        return reviewRepository.findByItem_ItemNoIn(itemNoList); // 리뷰 조회
    }

    // 특정 상품에 대한 리뷰 목록 조회
    public List<Review> getReviewsByItem(Long itemNo) {
        return reviewRepository.findByItem_ItemNo(itemNo);
    }
}
