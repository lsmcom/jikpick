package kr.it.code.main.order.controller;

import kr.it.code.main.order.dto.OrderDto;
import kr.it.code.main.order.dto.OrderRequestDto;
import kr.it.code.main.order.entity.Order;
import kr.it.code.main.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/latest")
    public OrderDto getLatestOrderByUser(@RequestParam Long userNo) {
        Order order = orderService.getLatestOrderByUser(userNo);
        return new OrderDto(order);  // ✅ 이렇게 DTO로 감싸서 리턴해야 프론트에서 쓰는 필드만 전달됨
    }

    @PostMapping
    public void createOrder(@RequestBody OrderRequestDto dto) {
        orderService.saveOrder(dto);
    }
}
