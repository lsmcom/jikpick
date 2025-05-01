package kr.it.code.main.transaction.repository;

import kr.it.code.main.transaction.entity.UserTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTransactionRepository extends JpaRepository<UserTransaction, Long> {

    // 특정 사용자 거래 조회 (구매자/판매자 둘 다 가능하게)
    List<UserTransaction> findByBuyerNoOrSellerNo(Long buyerNo, Long sellerNo);
}
