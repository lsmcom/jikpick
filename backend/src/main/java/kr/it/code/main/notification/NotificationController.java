//package kr.it.code.main.notification;
//
//import kr.it.code.main.notification.dto.NotificationRequestDto;
//import kr.it.code.main.notification.entity.Notification;
//import kr.it.code.main.notification.service.NotificationService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/notifications")
//@RequiredArgsConstructor
//public class NotificationController {
//
//    private final NotificationService notificationService;
//
//    @PostMapping("/dummy")
//    public String createDummyNotifications() {
//        // 예시 데이터 생성
//        NotificationRequestDto notification1 = new NotificationRequestDto();
//        notification1.setUserNo(1L);
//        notification1.setTitle("거래 상태 변경");
//        notification1.setMessage("거래 상태가 '결제 완료'로 변경되었습니다.");
//        notificationService.saveNotification(notification1);
//
//        NotificationRequestDto notification2 = new NotificationRequestDto();
//        notification2.setUserNo(2L);
//        notification2.setTitle("새로운 거래 알림");
//        notification2.setMessage("새로운 거래가 시작되었습니다.");
//        notificationService.saveNotification(notification2);
//
//        NotificationRequestDto notification3 = new NotificationRequestDto();
//        notification3.setUserNo(1L);
//        notification3.setTitle("알림");
//        notification3.setMessage("거래 상태가 '거래중'으로 변경되었습니다.");
//        notificationService.saveNotification(notification3);
//
//        return "예시 데이터 삽입 완료";
//    }
//    // ✅ 알림 저장
//    @PostMapping
//    public ResponseEntity<String> createNotification(@RequestBody NotificationRequestDto dto) {
//        notificationService.saveNotification(dto);
//        return ResponseEntity.status(HttpStatus.CREATED).body("알림 저장 완료");  // 201 Created 상태 코드로 응답
//    }
//
//    // ✅ 특정 유저의 알림 전체 조회
//    @GetMapping("/user/{userNo}")
//    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userNo) {
//        List<Notification> notifications = notificationService.getNotificationsByUserNo(userNo);
//        if (notifications.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(notifications); // 204 No Content 상태 코드
//        }
//        return ResponseEntity.ok(notifications);
//    }
//
//    // ✅ 특정 알림 삭제
//    @DeleteMapping("/{notificationId}")
//    public ResponseEntity<String> deleteNotification(@PathVariable Long notificationId) {
//        notificationService.deleteNotification(notificationId);
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("알림 삭제 완료"); // 204 No Content 상태 코드
//    }
//}
