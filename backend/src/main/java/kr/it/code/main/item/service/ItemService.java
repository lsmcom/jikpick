package kr.it.code.main.item.service;

import jakarta.persistence.EntityNotFoundException;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.category.repository.CategoryRepository;
import kr.it.code.main.category.service.CategoryService;
import kr.it.code.main.favorite.service.FavoriteService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryService categoryService;
    private final FavoriteService favoriteService;

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

    
    // 좋아요 수 기준으로 상품 목록을 가져오는 메소드
    public List<ItemLikeDto> findItemListOrderByLikeCount() {
        return itemRepository.findItemsOrderByLikeCount();
    }

    // 찜 추가/해제
    @Transactional
    public void toggleWish(Long itemNo, boolean isWish, Long userNo) {
        Item item = itemRepository.findById(itemNo).orElseThrow();

        if (isWish) {
            favoriteService.addFavorite(item, userNo);
            item.setItemWish(item.getItemWish() + 1);
        } else {
            favoriteService.removeFavorite(item, userNo); // ❗ removeFavorite 필요
            item.setItemWish(item.getItemWish() - 1);
        }

        itemRepository.save(item);
    }


    // 상품 조회
    public Item getItemById(Long itemNo) {
        return itemRepository.findByItemNo(itemNo).orElse(null); // ✅ 여기!
    }
}
