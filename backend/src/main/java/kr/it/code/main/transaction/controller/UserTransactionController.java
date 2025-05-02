//package kr.it.code.main.transaction.controller;
//
//import kr.it.code.main.transaction.entity.TransactionStatus;
//import kr.it.code.main.transaction.service.UserTransactionService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/transactions")
//@RequiredArgsConstructor
//public class UserTransactionController {
//
//    private final UserTransactionService userTransactionService;
//
//    // ✅ 거래 상태 변경
//    @PatchMapping("/{transactionNo}/status")
//    public ResponseEntity<String> updateTransactionStatus(
//            @PathVariable Long transactionNo,
//            @RequestParam String status
//    ) {
//        // 문자열로 들어온 status를 Enum으로 변환
//        TransactionStatus transactionStatus = TransactionStatus.valueOf(status);
//
//        userTransactionService.updateTransactionStatus(transactionNo, transactionStatus);
//        return ResponseEntity.ok("거래 상태가 변경되었습니다.");
//    }
//
//}
