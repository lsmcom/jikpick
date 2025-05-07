package kr.it.code.main.productsale.controller;


import kr.it.code.main.productsale.dto.MysaleDto;
import kr.it.code.main.productsale.service.ProductSaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class ProductSaleController {

    private final ProductSaleService productSaleService;

    // 마이페이지에서 사용자 판매내역 조회
    @GetMapping("/by-user")
    public ResponseEntity<List<MysaleDto>> getSalesByUser(@RequestParam Long userNo) {
        List<MysaleDto> sales = productSaleService.getSalesByUser(userNo);
        return ResponseEntity.ok(sales);
    }

    //판매상품 숨김 기능
    @PatchMapping("/{saleNo}/toggle-hide")
    public ResponseEntity<?> toggleHide(@PathVariable Long saleNo) {
       System.out.println("숨김컨트롤러");
        productSaleService.toggleHideStatus(saleNo);
        return ResponseEntity.ok().build();
    }

    //판매상품 삭제 기능
    @DeleteMapping("/{saleNo}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long saleNo) {
        productSaleService.deleteSale(saleNo);
        return ResponseEntity.ok().build();
    }

    //신고 기능
    @PostMapping("/{saleNo}/report")
    public ResponseEntity<Void> reportSale(
            @PathVariable Long saleNo,
            @RequestBody Map<String, String> body
    ) {
        String reason = body.get("reason"); // 신고 사유
        productSaleService.reportSale(saleNo, reason); // 서비스 호출
        return ResponseEntity.ok().build();
    }





}
