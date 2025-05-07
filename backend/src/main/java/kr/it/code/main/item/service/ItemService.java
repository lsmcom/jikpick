package kr.it.code.main.item.service;

import kr.it.code.main.category.repository.CategoryRepository;
import kr.it.code.main.category.service.CategoryService;
import kr.it.code.main.favorite.service.FavoriteService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemRequestDto;
import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import kr.it.code.main.store.dto.StoreDto;
import kr.it.code.main.productsale.entity.ProductSale;
import kr.it.code.main.productsale.repository.ProductSaleRepository;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.store.repository.StoreRepository;
import kr.it.code.main.user.User;
import kr.it.code.main.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.productsale.repository.ProductSaleRepository;
import kr.it.code.main.productsale.entity.ProductSale;
import java.io.File;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static kr.it.code.main.item.entity.QItem.item;
import static kr.it.code.main.user.QUser.user;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ProductSaleRepository productSaleRepository;
    private static final Logger logger = LoggerFactory.getLogger(ItemService.class);
    private final ItemRepository itemRepository;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final FavoriteService favoriteService;

    @Transactional //// 단일 카테고리 상품 조회
    public List<ItemDto> getItemsByCategory(Long categoryNo) {
        List<Item> items = itemRepository.findByCategory_CateNo(categoryNo);
        return items.stream().map(ItemDto::new).toList();
    }

    @Transactional // 대분류 포함 하위 모든 카테고리 상품 조회
    public List<ItemDto> getItemsInCategoryAndSubCategories(Long parentCategoryId) {
        List<Long> cateNos = categoryService.getAllChildCategoryIds(parentCategoryId);
        List<Item> items = itemRepository.findByCategoryCateNoIn(cateNos);
        return items.stream().map(ItemDto::new).toList();
    }

    // 신규 상품 등록
    public void registerItem(ItemRequestDto dto) {
        Item item = new Item();  // 바깥으로 뺌
        User user;
        Category category;
        Store mainStore;

        try {
            logger.info("상품 등록 요청 받음: itemName={}, itemCost={}, itemInfo={}, categoryNo={}, storeNos={}",
                    dto.getItemName(), dto.getItemCost(), dto.getItemInfo(), dto.getCategoryNo(), dto.getStoreNos());

            if (dto.getCategoryNo() == null) {
                throw new IllegalArgumentException("카테고리가 선택되지 않았습니다.");
            }

            if (dto.getStoreNos() == null || dto.getStoreNos().isEmpty()) {
                throw new RuntimeException("희망 지점을 1개 이상 선택해야 합니다.");
            }

            // 이미지 경로
            if (dto.getImagePaths() != null && !dto.getImagePaths().isEmpty()) {
                String joinedPaths = String.join(",", dto.getImagePaths());
                item.setImagePathList(joinedPaths);
            }

            // 기본 정보
            item.setItemName(dto.getItemName());
            item.setItemCost(dto.getItemCost());
            item.setItemInfo(dto.getItemInfo());
            item.setItemStatus(dto.getItemStatus());
            item.setItemDate(LocalDate.now());
            item.setPickOption(dto.getPickOption() == 1);
            item.setItemWish(0);
            item.setPickStatus("예약중");

            // 사용자 및 카테고리
            user = userRepository.findById(dto.getUserNo())
                    .orElseThrow(() -> new RuntimeException("사용자 없음"));
            category = categoryRepository.findById(dto.getCategoryNo())
                    .orElseThrow(() -> new RuntimeException("카테고리 없음"));

            // 지점
            List<Store> stores = storeRepository.findAllById(dto.getStoreNos());
            if (stores.isEmpty()) throw new RuntimeException("지점이 하나도 존재하지 않습니다.");
            mainStore = stores.get(0);
            item.setStore(mainStore);
            item.setStores(new HashSet<>(stores));

            // 유저 & 카테고리 연동
            item.setUser(user);
            item.setCategory(category);

            itemRepository.save(item);
            logger.info("상품 등록 완료: itemNo={}", item.getItemNo());

        } catch (Exception e) {
            logger.error("상품 등록 중 오류 발생", e);
            throw e;
        }

        // ✅ 여기서 ProductSale 연동 (try 밖에서 쓸 수 있게 변수 선언 위치를 바꿈)
        ProductSale sale = new ProductSale();
        sale.setSaleNo(item.getItemNo());
        sale.setItem(item);
        sale.setUser(user);
        sale.setStore(mainStore);
        sale.setCateNo(category.getCateNo());
        sale.setSaleDate(LocalDate.now());
        sale.setUserId(user.getUserId());
        sale.setStatus("판매중");

        productSaleRepository.save(sale);
        logger.info("판매 목록에도 저장 완료: saleNo={}", sale.getSaleNo());
    }

    @Transactional// 상품 상세 조회
    public ItemDto getItemDetail(Long itemNo) {
        Item item = itemRepository.findByItemNo(itemNo)
                .orElseThrow(() -> new RuntimeException("해당 상품이 존재하지 않습니다."));
        return new ItemDto(item);
    }

    @Transactional// 좋아요 수 기준으로 상품 목록을 가져오는 메소드
    public List<ItemDto> getPopularItems() {
        List<Item> items = itemRepository.findAllByOrderByItemWishDesc();
        return items.stream().map(ItemDto::new).toList();
    }

    // 찜 추가/해제
    @Transactional
    public void toggleWish(Long itemNo, boolean isWish, Long userNo) {
        Item item = itemRepository.findByItemNo(itemNo)
                .orElseThrow(() -> new RuntimeException("해당 상품(" + itemNo + ")은 존재하지 않습니다."));

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

    // 상품 직접 조회 (찜 기능에서 사용)
    public Item getItemById(Long itemNo) {
        return itemRepository.findByItemNo(itemNo).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<StoreDto> getStoresByItem(Long itemNo) {
        Item item = itemRepository.findById(itemNo)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        return item.getStores().stream()
                .map(StoreDto::fromEntity)
                .collect(Collectors.toList());
    }
}
