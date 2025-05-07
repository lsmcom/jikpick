package kr.it.code.main.order.entity;

import jakarta.persistence.*;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_order")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_NO")
    private Long orderNo;

    // 🔗 구매자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

    // 🔗 상품
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ITEM_NO")
    private Item item;

    // 🔗 선택된 지점
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_NO")
    private Store store;

    // 요청사항
    @Column(name = "REQUEST_NOTE", length = 500)
    private String requestNote;

    // 결제수단 (toss / general)
    @Column(name = "PAYMENT_TYPE", nullable = false)
    private String paymentType;

    // 결제 상세 (예: 카카오페이, 네이버페이 등)
    @Column(name = "PAYMENT_DETAIL")
    private String paymentDetail;

    // 직픽 여부
    @Column(name = "IS_PICKUP")
    private Boolean isPickup;

    // 주문일시
    @CreationTimestamp
    @Column(name = "ORDER_DATE", updatable = false)
    private LocalDateTime orderDate;

    // 거래 유효 기간 (예: 7일 후)
    @Column(name = "PICK_EXPIRY_DATE")
    private LocalDate pickExpiryDate;

    // 거래 상태: 예약중 / 거래중 / 완료 등
    @Column(name = "PICK_STATUS", length = 20)
    private String pickStatus;

    // 약관 전체 동의 여부
    @Column(name = "IS_AGREED_ALL")
    private Boolean isAgreedAll;
}
