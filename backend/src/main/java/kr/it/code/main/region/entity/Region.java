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
    @Column(name = "REG_NO")
    private Long regNo;

    @Column(name = "REG_NAME")
    private String regName;

    @Column(name="USER_NO")
    private Long userNo;

    public String getRegionName() {
        return regName;
    }// 필요하면 user_no도 추가
}

