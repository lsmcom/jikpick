package kr.it.code.main.item.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ItemRequestDto {

    private Long userNo;
    private Long categoryNo;
    private String itemName;
    private Integer itemCost;
    private String itemInfo;
    private String itemStatus;  // 'A' ~ 'E'
    private int pickOption;     // 0 또는 1

    @JsonProperty("imagePaths")  // ✅ 반드시 추가
    private List<String> imagePaths;
    // ✅ 직픽 지점 번호 필드 추가
    private Long storeNo;
}
