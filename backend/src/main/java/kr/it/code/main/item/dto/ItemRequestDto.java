package kr.it.code.main.item.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemRequestDto {

    private Long userNo;
    private Long categoryNo;
    private String itemName;
    private Integer itemCost;
    private String itemInfo;
    private String itemImage;   // 이미지 연동 전: ""
    private String itemStatus;  // 'A' ~ 'E'
    private int pickOption;     // 0 또는 1

    // ✅ 직픽 지점 번호 필드 추가
    private Long storeNo;
}
