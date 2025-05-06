package kr.it.code.main.category.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "category")
@Getter
@Setter
public class Category {
    @Id
    @Column(name= "CATE_NO")
    private Long cateNo;

    @Column(name = "CATE_NAME")
    private String cateName;


    @Column(name = "CATE_PARENT_NO", nullable = true)
    private Long cateParentNo;

    @Column(name = "CATE_LEVEL")
    private Integer cateLevel;

}
