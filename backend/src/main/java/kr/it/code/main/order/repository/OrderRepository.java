package kr.it.code.main.order.repository;

import kr.it.code.main.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findTopByUser_UserNoOrderByOrderDateDesc(Long userNo);
}
