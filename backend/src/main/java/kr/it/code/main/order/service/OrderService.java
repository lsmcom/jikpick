package kr.it.code.main.order.service;

import kr.it.code.main.order.dto.OrderDto;
import kr.it.code.main.user.UserRepository;
import kr.it.code.main.item.repository.ItemRepository;
import kr.it.code.main.store.repository.StoreRepository;
import kr.it.code.main.order.dto.OrderRequestDto;
import kr.it.code.main.order.entity.Order;
import kr.it.code.main.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final StoreRepository storeRepository;
    private final OrderRepository orderRepository;

    public Order getLatestOrderByUser(Long userNo) {
        return orderRepository.findTopByUser_UserNoOrderByOrderDateDesc(userNo)
                .orElseThrow(() -> new RuntimeException("최근 주문이 없습니다."));
    }

    @Transactional
    public void saveOrder(OrderRequestDto dto) {
        Order order = new Order();

        // 연관관계 설정
        order.setUser(userRepository.findById(dto.getUserNo()).orElseThrow());
        order.setItem(itemRepository.findById(dto.getItemNo()).orElseThrow());
        order.setStore(storeRepository.findById(dto.getStoreNo()).orElseThrow());

        // 단순 필드 설정
        order.setPaymentType(dto.getPaymentType());
        order.setPaymentDetail(dto.getPaymentDetail());
        order.setIsPickup(dto.getIsPickup());
        order.setRequestNote(dto.getRequestNote());
        order.setIsAgreedAll(dto.getIsAgreedAll());
        order.setPickExpiryDate(LocalDate.parse(dto.getPickExpiryDate()));
        order.setPickStatus(dto.getPickStatus());

        orderRepository.save(order);
    }
}
