//package kr.it.code.main.notification.service;
//
//import kr.it.code.main.notification.dto.NotificationRequestDto;
//import kr.it.code.main.notification.entity.Notification;
//import kr.it.code.main.notification.repository.NotificationRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class NotificationService {
//
//    private final NotificationRepository notificationRepository;
//
//    // 알림 저장
//    public void saveNotification(NotificationRequestDto dto) {
//        Notification notification = new Notification();
//        notification.setUserNo(dto.getUserNo());
//        notification.setTitle(dto.getTitle());
//        notification.setMessage(dto.getMessage());
//        notificationRepository.save(notification);
//    }
//
//    // 특정 유저의 알림 조회
//    public List<Notification> getNotificationsByUserNo(Long userNo) {
//        return notificationRepository.findByUserNo(userNo);
//    }
//
//    // 알림 삭제
//    public void deleteNotification(Long id) {
//        Notification notification = notificationRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("알림을 찾을 수 없습니다."));
//        notificationRepository.delete(notification);
//    }
//}
