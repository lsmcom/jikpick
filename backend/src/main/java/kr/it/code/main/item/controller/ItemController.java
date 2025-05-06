package kr.it.code.main.item.controller;

import kr.it.code.main.favorite.service.FavoriteService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    private final FavoriteService favoriteService;

    // 📦 기존: 단일 카테고리 번호로 상품 조회
    @GetMapping
    public ResponseEntity<List<ItemDto>> getItemsByCategory(@RequestParam Long categoryNo) {
        return ResponseEntity.ok(itemService.getItemsByCategory(categoryNo));
    }

    // ✅ 신규: 대분류 선택 시 하위 카테고리 포함 전체 상품 조회
    @GetMapping("/in-category-tree")
    public ResponseEntity<List<ItemDto>> getItemsInCategoryTree(@RequestParam Long categoryNo) {
        return ResponseEntity.ok(itemService.getItemsInCategoryAndSubCategories(categoryNo));
    }

    // 상품 상세 조회
    @GetMapping("/{itemNo}")
    public ResponseEntity<ItemDto> getItemDetail(@PathVariable Long itemNo) {
        ItemDto item = itemService.getItemDetail(itemNo);
        return ResponseEntity.ok(item);
    }

    // 찜 추가/해제
    @PostMapping("/{itemNo}/wish")
    public ResponseEntity<Void> toggleWish(@PathVariable Long itemNo, @RequestBody Map<String, Object> requestBody) {
        try {
            Object wishObj = requestBody.get("wish");
            Object userNoObj = requestBody.get("userNo");

            if (wishObj == null || userNoObj == null) {
                System.out.println("❌ 필수 데이터 누락: " + requestBody);
                return ResponseEntity.badRequest().build();
            }

            boolean isWish = Boolean.parseBoolean(wishObj.toString());
            Long userNo = Long.valueOf(userNoObj.toString());

            itemService.toggleWish(itemNo, isWish, userNo);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 좋아요 수 기준으로 상품을 내림차순으로 정렬하여 반환
    @GetMapping("/popular")
    public ResponseEntity<List<ItemDto>> getPopularItems() {
        return ResponseEntity.ok(itemService.getPopularItems());
    }

    @GetMapping("/{itemNo}/wish/check")
    public ResponseEntity<Boolean> checkWishStatus(
            @PathVariable Long itemNo,
            @RequestParam Long userNo
    ) {
        boolean isWished = favoriteService.isFavorite(itemNo, userNo);
        return ResponseEntity.ok(isWished);
    }
}