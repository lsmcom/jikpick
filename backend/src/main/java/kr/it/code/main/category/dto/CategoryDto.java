package kr.it.code.main.category.dto;

import kr.it.code.main.category.entity.Category;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryDto {
    private Long cateNo;
    private String cateName;
    private Integer cateLevel;
    private Long cateParentNo;

    private List<CategoryDto> children = new ArrayList<>();

    public CategoryDto(Category category) {
        this.cateNo = category.getCateNo();
        this.cateName = category.getCateName();
        this.cateLevel = category.getCateLevel();
        this.cateParentNo = category.getCateParentNo() != null ? category.getCateParentNo() : null;
    }


}
