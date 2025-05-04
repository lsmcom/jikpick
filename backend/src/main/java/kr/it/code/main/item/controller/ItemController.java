package kr.it.code.main.item.controller;

import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemRequestDto;
import kr.it.code.main.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

     //✅ 상품 등록
    @PostMapping
    public ResponseEntity<String> registerItem(@RequestBody ItemRequestDto dto) {
        itemService.registerItem(dto);
        return ResponseEntity.ok("등록 완료");
    }
////    // 상품 상세 조회
////    @GetMapping("/{itemNo}")
////    public ResponseEntity<ItemDto> getItemDetail(@PathVariable Long itemNo) {
////        ItemDto item = itemService.getItemDetail(itemNo);
////        return ResponseEntity.ok(item);
////    }
}
