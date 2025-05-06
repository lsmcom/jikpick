package kr.it.code.main.item.service;

import jakarta.persistence.EntityNotFoundException;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.category.repository.CategoryRepository;
import kr.it.code.main.category.service.CategoryService;
import kr.it.code.main.favorite.service.FavoriteService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemRequestDto;
import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.store.repository.StoreRepository;
import kr.it.code.main.user.User;
import kr.it.code.main.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private static final Logger logger = LoggerFactory.getLogger(ItemService.class);
    private final ItemRepository itemRepository;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final FavoriteService favoriteService;

    // 단일 카테고리 상품 조회
    public List<ItemDto> getItemsByCategory(Long categoryNo) {
        List<Item> items = itemRepository.findByCategory_CateNo(categoryNo);
        return items.stream().map(ItemDto::new).toList();
    }

    // 대분류 포함 하위 모든 카테고리 상품 조회
    public List<ItemDto> getItemsInCategoryAndSubCategories(Long parentCategoryId) {
        List<Long> cateNos = categoryService.getAllChildCategoryIds(parentCategoryId);
        List<Item> items = itemRepository.findByCategoryCateNoIn(cateNos);
        return items.stream().map(ItemDto::new).toList();
    }

    // 신규 상품 등록
    public void registerItem(ItemRequestDto dto) {
        try {
            logger.info("상품 등록 요청 받음: itemName={}, itemCost={}, itemInfo={}, categoryNo={}, storeNo={}",
                    dto.getItemName(), dto.getItemCost(), dto.getItemInfo(), dto.getCategoryNo(), dto.getStoreNo());

            if (dto.getCategoryNo() == null) {
                throw new IllegalArgumentException("카테고리가 선택되지 않았습니다.");
            }

            if (dto.getStoreNo() == null) {
                throw new RuntimeException("Store ID cannot be null");
            }
            Item item = new Item();

            // ✅ 올바른 코드 (리스트에서 첫 번째 이미지 사용)
            if (dto.getImagePaths() != null && !dto.getImagePaths().isEmpty()) {
                String joinedPaths = String.join(",", dto.getImagePaths());
                item.setImagePathList(joinedPaths);
            }



            item.setItemName(dto.getItemName());
            item.setItemCost(dto.getItemCost());
            item.setItemInfo(dto.getItemInfo());
            item.setItemStatus(dto.getItemStatus());
            item.setItemDate(LocalDate.now());
            item.setPickOption(dto.getPickOption() == 1);
            item.setItemWish(0);
            item.setPickStatus("예약중");

            User user = userRepository.findById(dto.getUserNo())
                    .orElseThrow(() -> new RuntimeException("사용자 없음"));
            Category category = categoryRepository.findById(dto.getCategoryNo())
                    .orElseThrow(() -> new RuntimeException("카테고리 없음"));
            Store store = storeRepository.findById(dto.getStoreNo())
                    .orElseThrow(() -> new RuntimeException("지점 없음"));

            item.setUser(user);
            item.setCategory(category);
            item.setStore(store);

            itemRepository.save(item);
            logger.info("상품 등록 완료: itemNo={}", item.getItemNo());

        } catch (Exception e) {
            logger.error("상품 등록 중 오류 발생", e);
            throw e;
        }
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
    public void deleteImageFile(String fileName) {
        String uploadDir = "C:/jikpick_uploads/";
        File file = new File(uploadDir + fileName);
        if (file.exists()) {
            file.delete();
        }
    }



    // 상품 조회
    public Item getItemById(Long itemNo) {
        return itemRepository.findByItemNo(itemNo).orElse(null); // ✅ 여기!
    }
}
