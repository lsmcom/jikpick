package kr.it.code.main.transaction.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_transaction")
@Getter
@Setter
public class UserTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_no")
    private Long transactionNo;

    @Column(name = "sale_no", nullable = false)
    private Long saleNo;

    @Column(name = "pur_no", nullable = false)
    private Long purNo;

    @Column(name = "buyer_no", nullable = false)
    private Long buyerNo;

    @Column(name = "seller_no", nullable = false)
    private Long sellerNo;

    @Column(name = "branch_no")
    private Long branchNo;

    @Column(name = "request_msg")
    private String requestMsg;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TransactionStatus status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
