package kr.it.code.main.order.service;

import kr.it.code.main.item.entity.Item;
import kr.it.code.main.order.dto.OrderDto;
import kr.it.code.main.purchase.entity.Purchase;
import kr.it.code.main.purchase.repository.PurchaseRepository;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.user.User;
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
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final StoreRepository storeRepository;
    private final OrderRepository orderRepository;
    private final PurchaseRepository purchaseRepository;

    @Transactional(readOnly = true)
    public Optional<OrderDto> getLatestOrderDto(Long userNo) {
        List<Order> orders = orderRepository.findTop1ByUser_UserNoOrderByOrderDateDescFetch(userNo);
        if (orders.isEmpty()) return Optional.empty();
        return Optional.of(new OrderDto(orders.get(0)));
    }

    @Transactional
    public void createFakePayment(OrderRequestDto dto) {
        Order order = new Order();

        User user = userRepository.findById(dto.getUserNo())
                .orElseThrow(() -> new RuntimeException("유저 없음"));
        Item item = itemRepository.findById(dto.getItemNo())
                .orElseThrow(() -> new RuntimeException("상품 없음"));

        Store store = null;
        if (dto.getIsPickup() != null && dto.getIsPickup()) {
            if (dto.getStoreNo() == null) {
                throw new IllegalArgumentException("직픽 거래일 경우 지점 정보가 필요합니다.");
            }
            store = storeRepository.findById(dto.getStoreNo())
                    .orElseThrow(() -> new RuntimeException("지점 없음"));
            order.setStore(store);
        }

        order.setUser(user);
        order.setItem(item);
        order.setPaymentType(dto.getPaymentType());
        order.setPaymentDetail(dto.getPaymentDetail());
        order.setIsPickup(dto.getIsPickup());
        order.setRequestNote(dto.getRequestNote());
        order.setIsAgreedAll(dto.getIsAgreedAll());
        order.setPickExpiryDate(LocalDate.parse(dto.getPickExpiryDate()));
        order.setPickStatus(dto.getPickStatus());

        orderRepository.save(order);

        // ✅ 구매내역 추가
        Purchase purchase = new Purchase();
        purchase.setUser(user);
        purchase.setItem(item);
        purchase.setStore(store);
        purchase.setCateNo(item.getCategory().getCateNo());
        purchase.setPurDate(LocalDate.now());
        purchase.setUserId(user.getUserId());

        purchaseRepository.save(purchase); // ⬅️ 꼭 저장해야 DB에 들어감
    }
}
