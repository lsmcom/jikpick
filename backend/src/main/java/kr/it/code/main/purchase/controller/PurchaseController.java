package kr.it.code.main.purchase.controller;

import kr.it.code.main.purchase.dto.PurchaseDto;
import kr.it.code.main.purchase.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;

    @GetMapping("/user")
    public ResponseEntity<List<PurchaseDto>> getPurchasesByUser(@RequestParam Long userNo) {
        List<PurchaseDto> purchases = purchaseService.getUserPurchaseList(userNo);
        return ResponseEntity.ok(purchases);
    }
}
