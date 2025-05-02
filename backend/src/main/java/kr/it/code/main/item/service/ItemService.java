package kr.it.code.main.item.service;

import kr.it.code.main.category.entity.Category;
import kr.it.code.main.category.repository.CategoryRepository;
import kr.it.code.main.category.service.CategoryService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemRequestDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.store.repository.StoreRepository;
import kr.it.code.main.user.User;
import kr.it.code.main.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository; // ✅ 직픽 지점용

    // ✅ 단일 카테고리 상품 조회
    public List<ItemDto> getItemsByCategory(Long categoryNo) {
        List<Item> items = itemRepository.findByCategory_CateNo(categoryNo);
        return items.stream()
                .map(ItemDto::new)
                .toList();
    }

    // ✅ 대분류 포함 하위 모든 카테고리 상품 조회
    public List<ItemDto> getItemsInCategoryAndSubCategories(Long parentCategoryId) {
        List<Long> cateNos = categoryService.getAllChildCategoryIds(parentCategoryId);
        List<Item> items = itemRepository.findByCategoryCateNoIn(cateNos);
        return items.stream()
                .map(ItemDto::new)
                .toList();
    }

    // ✅ 신규 상품 등록
    public void registerItem(ItemRequestDto dto) {
        Item item = new Item();
        item.setItemName(dto.getItemName());
        item.setItemCost(dto.getItemCost());
        item.setItemInfo(dto.getItemInfo());
        item.setItemImage(dto.getItemImage());
        item.setItemStatus(dto.getItemStatus());
        item.setItemDate(LocalDate.now());
        item.setPickOption(dto.getPickOption() == 1);
        item.setItemWish(0);
        item.setPickStatus("예약중");

        // 사용자, 카테고리, 지점 조회
        User user = userRepository.findById(dto.getUserNo())
                .orElseThrow(() -> new RuntimeException("사용자 없음"));
        Category category = categoryRepository.findById(dto.getCategoryNo())
                .orElseThrow(() -> new RuntimeException("카테고리 없음"));
        Store store = storeRepository.findById(dto.getStoreNo())
                .orElseThrow(() -> new RuntimeException("지점 없음"));

        item.setUser(user);
        item.setCategory(category);
        item.setStore(store); // ✅ 지점 정보 설정

        itemRepository.save(item);
    }
    // 상품 상세 조회
    public ItemDto getItemDetail(Long itemNo) {
        Item item = itemRepository.findByItemNo(itemNo)
                .orElseThrow(() -> new RuntimeException("해당 상품이 존재하지 않습니다."));
        return new ItemDto(item);
    }

}
