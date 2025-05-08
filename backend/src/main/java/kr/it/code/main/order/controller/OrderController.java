package kr.it.code.main.order.controller;

import kr.it.code.main.order.dto.OrderDto;
import kr.it.code.main.order.dto.OrderRequestDto;
import kr.it.code.main.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/latest")
    public ResponseEntity<OrderDto> getLatestOrderByUser(@RequestParam Long userNo) {
        Optional<OrderDto> latest = orderService.getLatestOrderDto(userNo);
        return latest.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build()); // ✅ null 대신 204 반환
    }

    @PostMapping
    public ResponseEntity<Void> createOrder(@RequestBody OrderRequestDto dto) {
        orderService.createFakePayment(dto);
        return ResponseEntity.ok().build();
    }
}
