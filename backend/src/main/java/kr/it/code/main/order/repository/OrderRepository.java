package kr.it.code.main.order.repository;

import kr.it.code.main.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findTopByUser_UserNoOrderByOrderDateDesc(Long userNo);

    @Query("""
    SELECT o FROM Order o
    JOIN FETCH o.item
    JOIN FETCH o.store
    WHERE o.user.userNo = :userNo
    ORDER BY o.orderDate DESC
    """)
    List<Order> findTop1ByUser_UserNoOrderByOrderDateDescFetch(@Param("userNo") Long userNo);
}
