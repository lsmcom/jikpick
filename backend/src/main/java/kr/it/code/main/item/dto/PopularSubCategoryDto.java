package kr.it.code.main.item.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PopularSubCategoryDto {
    private Long cateNo;
    private String cateName;
    private Long totalWish;

}
