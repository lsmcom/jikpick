package kr.it.code.main.productsale.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MysaleDto {
    private Long saleNo;         // 판매 번호
    private Long itemNo;         // 상품 번호
    private String itemName;     // 상품명
    private int itemCost;        // 가격
    private String regionName;   // 예: "종로구 마켓왕"
    private String itemImage;    // 썸네일 이미지 경로
    private int itemWishCount;   // 좋아요 수
    private String saleDate;     // 거래일 (yyyy-MM-dd 문자열)
    private String pickStatus;  // ← 거래 상태 (예: "판매중", "거래완료" 등)
    private String status;

}
