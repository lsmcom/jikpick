package kr.it.code.main.productlikes.controller;


import kr.it.code.main.productlikes.service.ProductLikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product-likes")
public class ProductLikesController {

    private final ProductLikesService productLikesService;

    // ✅ 특정 상품의 좋아요 개수 반환
    @GetMapping("/count")
    public long countLikes(@RequestParam Long itemNo) {
        return productLikesService.countLikesByItem(itemNo);
    }
}
