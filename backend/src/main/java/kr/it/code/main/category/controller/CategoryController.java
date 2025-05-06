package kr.it.code.main.category.controller;


import kr.it.code.main.category.dto.CategoryDto;
import kr.it.code.main.category.service.CategoryService;
import kr.it.code.main.item.dto.PopularSubCategoryDto;
import kr.it.code.main.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final ItemRepository itemRepository;

    //1. 카테고리 전체 목록 불러오기
    @GetMapping("/tree")
    public ResponseEntity<List<CategoryDto>> getCategoryTree() {
        List<CategoryDto> categoryTree = categoryService.getAllCategories();
        System.out.println("CategoryController loaded!");
        return ResponseEntity.ok(categoryTree);
    }

    //2. 대중소 카테고리중 하나 클릭시 하위카테고리 + 상품목록 조회
    @GetMapping("/children")
    public ResponseEntity<List<CategoryDto>> getChildCategories(
            @RequestParam(required = false) Long parentNo) {
        List<CategoryDto> children = categoryService.getChildrenByParentNo(parentNo);
        return ResponseEntity.ok(children);
    }

    //3. 카테고리 상세 조회(카테고리 ID로 형제 카테고리명 가져오기)
    @GetMapping("/detail/{categoryNo}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long categoryNo) {
        return ResponseEntity.ok(categoryService.getCategoryById(categoryNo));
    }

    @GetMapping("/popular-sub")
    public ResponseEntity<List<PopularSubCategoryDto>> getPopularSubCategories() {
        List<PopularSubCategoryDto> result = categoryService.getPopularSubCategories();
        return ResponseEntity.ok(result);
    }






}
