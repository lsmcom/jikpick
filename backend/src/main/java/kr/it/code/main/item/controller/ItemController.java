package kr.it.code.main.item.controller;

import kr.it.code.main.favorite.service.FavoriteService;
import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemRequestDto;
import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.service.ItemService;
import kr.it.code.main.store.dto.StoreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    private final FavoriteService favoriteService;
    private final String uploadDir = "C:/jikpick_uploads/";

    //이미지업로드
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<String> registerItem(
            @RequestPart("itemRequestDto") ItemRequestDto dto,
            @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles
    ) {
        // ✅ 파일 저장 로직 (선택 사항)
        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<String> imagePaths = new ArrayList<>();
            for (MultipartFile file : imageFiles) {
                try {
                    String originalName = file.getOriginalFilename();
                    String savedName = UUID.randomUUID() + "_" + originalName;
                    File saveFile = new File("C:/jikpick_uploads/" + savedName);
                    file.transferTo(saveFile);
                    imagePaths.add("/images/" + savedName);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            // ✅ 이미지 경로 리스트를 dto에 세팅
            dto.setImagePaths(imagePaths);
        }

        itemService.registerItem(dto);
        return ResponseEntity.ok("등록 완료");
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFiles") MultipartFile file) {
        try {
            String originalName = file.getOriginalFilename();
            String savedName = UUID.randomUUID() + "_" + originalName;
            File saveFile = new File(uploadDir + savedName);
            file.transferTo(saveFile);

            String imageUrl = "/images/" + savedName;
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 실패");
        }
    }



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
    // ✅ 수정된 버전
    @PostMapping("/{itemNo}/wish")
    public ResponseEntity<Void> toggleWish(
            @PathVariable Long itemNo,
            @RequestBody Map<String, Object> payload
    ) {
        try {
            if (!payload.containsKey("wish") || !payload.containsKey("userNo")) {
                return ResponseEntity.badRequest().build();
            }

            boolean isWish = Boolean.parseBoolean(payload.get("wish").toString());
            Long userNo = Long.parseLong(payload.get("userNo").toString());

            itemService.toggleWish(itemNo, isWish, userNo);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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

    @GetMapping("/{itemNo}/stores")
    public ResponseEntity<List<StoreDto>> getItemStores(@PathVariable Long itemNo) {
        List<StoreDto> storeDtos = itemService.getStoresByItem(itemNo);
        return ResponseEntity.ok(storeDtos);
    }
}