package kr.it.code.main.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestDto {
    private Long userNo;
    private Long itemNo;
    private Long storeNo;
    private String paymentType;
    private String paymentDetail; // 일반결제만 해당
    private Boolean isPickup;
    private String requestNote;
    private Boolean isAgreedAll;
    private String pickExpiryDate; // yyyy-MM-dd 형식
    private String pickStatus;     // 예: "예약중"
}