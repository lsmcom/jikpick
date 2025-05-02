//package kr.it.code.main.transaction.service;
//
//import kr.it.code.main.notification.dto.NotificationRequestDto;
//import kr.it.code.main.notification.service.NotificationService;
//import kr.it.code.main.transaction.entity.TransactionStatus;
//import kr.it.code.main.transaction.entity.UserTransaction;
//import kr.it.code.main.transaction.repository.UserTransactionRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class UserTransactionService {
//
//    private final UserTransactionRepository userTransactionRepository;
//    private final NotificationService notificationService;
//    private static final Logger log = LoggerFactory.getLogger(UserTransactionService.class);
//
//    // ✅ 거래 저장
//    public UserTransaction saveTransaction(UserTransaction transaction) {
//        return userTransactionRepository.save(transaction);
//    }
//
//    // ✅ 거래 상태 변경
//    @Transactional
//    public void updateTransactionStatus(Long transactionNo, TransactionStatus status) {
//        // 거래 찾기
//        UserTransaction transaction = userTransactionRepository.findById(transactionNo)
//                .orElseThrow(() -> new IllegalArgumentException("거래를 찾을 수 없습니다."));
//
//        // 상태 변경
//        transaction.setStatus(status);
//
//        // ✅ 알림 생성
//        NotificationRequestDto dto = new NotificationRequestDto();
//        Long userNo = transaction.getBuyerNo(); // 기본적으로 구매자에게 알림을 보내지만
//
//        // 거래 상태에 따라 알림 대상 변경
//        if (status == TransactionStatus.COMPLETED || status == TransactionStatus.CANCELED) {
//            // 거래 완료나 취소 상태에서는 구매자에게 알림
//            dto.setUserNo(transaction.getBuyerNo());
//        } else {
//            // 그 외 상태는 판매자에게 알림
//            dto.setUserNo(transaction.getSellerNo());
//        }
//
//        // 알림 제목과 메시지 설정
//        String title = "거래 상태 변경";
//        if (status == TransactionStatus.COMPLETED) {
//            title = "거래 완료";
//        } else if (status == TransactionStatus.CANCELED) {
//            title = "거래 취소";
//        }
//
//        dto.setTitle(title);
//        dto.setMessage("거래 상태가 '" + status.getLabel() + "'로 변경되었습니다.");
//
//        // 알림 저장
//        try {
//            notificationService.saveNotification(dto);
//        } catch (Exception e) {
//            log.error("알림 저장 실패", e);
//            throw new RuntimeException("알림 저장 실패");
//        }
//    }
//
//    // ✅ 특정 유저 거래 조회
//    public List<UserTransaction> getUserTransactions(Long userNo) {
//        return userTransactionRepository.findByBuyerNoOrSellerNo(userNo, userNo);
//    }
//}
