package kr.it.code.main.notification.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Notification {

    @Id
    private Long userNo;  // 기본 키를 userNo로 설정

    private Long transactionNo; // 거래 정보와 연결

    private String message; // 알림 메시지

    private Boolean isRead = false;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();  // 생성 시 현재 시간 설정
    }

    @PreUpdate
    protected void onUpdate() {
        this.createdAt = LocalDateTime.now();  // 업데이트 시에도 시간을 갱신
    }

    // 필요 시 title도 설정할 수 있습니다.
    public void setTitle(String title) {
        // title 설정 로직
    }
}
