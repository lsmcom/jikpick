package kr.it.code.main.item.controller;

import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

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
    public ResponseEntity<Void> toggleWish(@PathVariable Long itemNo, @RequestBody Map<String, Boolean> requestBody) {
        boolean isWish = requestBody.get("wish");
        try {
            // 상품 존재 여부 확인
            Item item = itemService.getItemById(itemNo);
            if (item == null) {
                return ResponseEntity.notFound().build();
            }

            // 찜 상태 업데이트 - updateItemWish 메서드 호출 없이 처리
            itemService.toggleWish(itemNo, isWish);  // toggleWish를 사용하여 찜 상태 처리
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 좋아요 수 기준으로 상품을 내림차순으로 정렬하여 반환
    @GetMapping("/popular")
    public ResponseEntity<List<ItemLikeDto>> getPopularItems() {
        return ResponseEntity.ok(itemService.findItemListOrderByLikeCount());
    }
}