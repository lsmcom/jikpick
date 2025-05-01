package kr.it.code.main.item.service;

import kr.it.code.main.category.entity.Category;
import kr.it.code.main.category.repository.CategoryRepository;
import kr.it.code.main.category.service.CategoryService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryService categoryService;

    public List<ItemDto> getItemsByCategory(Long categoryNo) {
        List<Item> items = itemRepository.findByCategory_CateNo(categoryNo);
        return items.stream()
                .map(ItemDto::new)
                .toList();
    }

    // ✅ 대분류 포함 하위 모든 카테고리 상품 조회용
    public List<ItemDto> getItemsInCategoryAndSubCategories(Long parentCategoryId) {
        // 1. 대분류 + 중분류 + 소분류 카테고리 번호 전부 가져오기
        List<Long> cateNos = categoryService.getAllChildCategoryIds(parentCategoryId);

        // 2. 해당 카테고리들에 등록된 상품 조회
        List<Item> items = itemRepository.findByCategoryCateNoIn(cateNos);

        // 3. Entity → DTO로 변환
        return items.stream()
                .map(ItemDto::new)
                .toList();
    }

}
