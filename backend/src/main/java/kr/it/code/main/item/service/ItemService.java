package kr.it.code.main.item.service;

import jakarta.persistence.EntityNotFoundException;
import kr.it.code.main.category.service.CategoryService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryService categoryService;

    // 상품 리스트 조회
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

    // 상품 상세 조회
    public ItemDto getItemDetail(Long itemNo) {
        Item item = itemRepository.findByItemNo(itemNo)
                .orElseThrow(() -> new RuntimeException("해당 상품이 존재하지 않습니다."));
        return new ItemDto(item);
    }

    // 찜 추가/해제
    @Transactional
    public void toggleWish(Long itemNo, boolean isWish) {
        Item item = itemRepository.findByItemNo(itemNo)
                .orElseThrow(() -> new EntityNotFoundException("상품을 찾을 수 없습니다."));

        if (isWish) {
            item.setItemWish(item.getItemWish() + 1); // 찜 추가
        } else {
            item.setItemWish(item.getItemWish() - 1); // 찜 해제
        }

        itemRepository.save(item); // DB에 저장
    }

    // 상품 조회
    public Item getItemById(Long itemNo) {
        return itemRepository.findById(itemNo).orElse(null);
    }
}
