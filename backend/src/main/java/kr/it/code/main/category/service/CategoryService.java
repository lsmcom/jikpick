package kr.it.code.main.category.service;

import kr.it.code.main.category.dto.CategoryDto;
import kr.it.code.main.category.entity.Category;
import kr.it.code.main.category.repository.CategoryRepository;
import kr.it.code.main.item.dto.PopularSubCategoryDto;
import kr.it.code.main.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;


    public List<CategoryDto> getAllCategories(){
    List<Category> all  = categoryRepository.findAll();

    //카테고리 번호로 DTO를 빠르게 찾기 위한 Map
    Map<Long, CategoryDto> dtoMap = new HashMap<>();

    //최종 반환할 루트 카테고리 리스트 (cateParentNo == null인것들)
    List<CategoryDto> rootList = new ArrayList<>();

    //1. 모든 카테고리를 DTO로 바꿔서 Map에 저장
        for(Category category : all){
            dtoMap.put(category.getCateNo(), new CategoryDto(category));
        }

        //2.parentNo를 기준으로 계층구조 구성
        for(Category category : all){
            Long parentNo = category.getCateParentNo();
            CategoryDto currentDto = dtoMap.get(category.getCateNo());

            if (parentNo == null) {
                // 대분류면 루트 리스트에 추가
                rootList.add(currentDto);
            } else {
                // 중/소분류면 부모의 children에 추가
                CategoryDto parentDto = dtoMap.get(parentNo);
                if (parentDto != null) {
                    parentDto.getChildren().add(currentDto);
                }
            }
        }

        return rootList;
    }

    public List<CategoryDto> getChildrenByParentNo(Long parentNo) {

        // parentNo == null 이면 findByCateParentNo(null) 또는 find roots
        List<Category> cats = (parentNo == null)
                ? categoryRepository.findByCateParentNoIsNull()
                : categoryRepository.findByCateParentNo(parentNo);

        return cats.stream()
                .map(CategoryDto::new)
                .toList();
    }


    public CategoryDto getCategoryById(Long categoryNo) {
        Category category = categoryRepository.findById(categoryNo)
                .orElseThrow(()-> new RuntimeException("카테고리를 찾을수 없습니다."));

        return new  CategoryDto(category);
    }

    // ✅ 선택한 카테고리 포함, 모든 하위 카테고리 번호를 리스트로 반환
    public List<Long> getAllChildCategoryIds(Long parentCategoryId) {
        List<Long> result = new ArrayList<>();
        result.add(parentCategoryId); // 자기 자신 포함
        collectChildren(parentCategoryId, result);
        return result;
    }

    // 🔁 재귀적으로 하위 카테고리 번호를 수집하는 내부 메소드
    private void collectChildren(Long parentId, List<Long> result) {
        List<Category> children = categoryRepository.findByCateParentNo(parentId);
        for (Category child : children) {
            result.add(child.getCateNo());
            collectChildren(child.getCateNo(), result); // 자식의 자식도 추가
        }

    }

    public List<PopularSubCategoryDto> getPopularSubCategories() {
        return itemRepository.findTopSubCategoriesByWish();
    }







}
