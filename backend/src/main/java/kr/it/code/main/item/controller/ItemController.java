package kr.it.code.main.item.controller;

import kr.it.code.main.item.dto.ItemDto;
import kr.it.code.main.item.dto.ItemRequestDto;
import kr.it.code.main.item.dto.ItemLikeDto;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.service.ItemService;
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

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

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

    // 📦 단일 카테고리 상품 조회
    @GetMapping
    public ResponseEntity<List<ItemDto>> getItemsByCategory(@RequestParam Long categoryNo) {
        return ResponseEntity.ok(itemService.getItemsByCategory(categoryNo));
    }

    // ✅ 하위 포함 전체 상품 조회
    @GetMapping("/in-category-tree")
    public ResponseEntity<List<ItemDto>> getItemsInCategoryTree(@RequestParam Long categoryNo) {
        return ResponseEntity.ok(itemService.getItemsInCategoryAndSubCategories(categoryNo));
    }



    // 찜 추가/해제
    @PostMapping("/{itemNo}/wish")
    public ResponseEntity<Void> toggleWish(@PathVariable Long itemNo, @RequestBody Map<String, Object> requestBody) {
        boolean isWish = (Boolean) requestBody.get("wish");
        Long userNo = Long.parseLong(requestBody.get("userNo").toString());

        try {
            Item item = itemService.getItemById(itemNo);
            if (item == null) {
                return ResponseEntity.notFound().build();
            }

            itemService.toggleWish(itemNo, isWish, userNo);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 인기순 상품 리스트
    @GetMapping("/popular")
    public ResponseEntity<List<ItemLikeDto>> getPopularItems() {
        return ResponseEntity.ok(itemService.findItemListOrderByLikeCount());
    }

    // 상품 상세 조회
    @GetMapping("/{itemNo}")
    public ResponseEntity<ItemDto> getItemDetail(@PathVariable Long itemNo) {
        ItemDto item = itemService.getItemDetail(itemNo);
        return ResponseEntity.ok(item);
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



    // ✅ 이미지 삭제 엔드포인트
    @DeleteMapping("/delete-image")
    public ResponseEntity<String> deleteImage(@RequestParam String path) {
        try {
            Path filePath = Paths.get("C:/jikpick_uploads/" + path);
            File file = filePath.toFile();

            if (file.exists()) {
                file.delete();
                return ResponseEntity.ok("삭제 완료");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("파일이 존재하지 않습니다");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 삭제 실패");
        }
    }



}
