package kr.it.code.main.notification.dto;

import lombok.Getter;
import lombok.Setter;

// ✅ 알림 생성 요청 DTO
@Getter
@Setter
public class NotificationRequestDto {
    private Long userNo;
    private Long transactionNo;
    private String title;
    private String message;

    // 💡 title은 프론트에 보여줄 label로 가공해서 사용하므로, label getter를 따로 정의
    public String getLabel() {
        return title;
    }
}
