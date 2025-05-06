package kr.it.code.main.region.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "region")
@Getter
@Setter
public class Region {

    @Id
    @Column(name = "reg_no")
    private Long regNo;

    @Column(name = "reg_name")
    private String regName;

    @Column(name="user_no")
    private Long userNo;



    // 필요하면 user_no도 추가
}

