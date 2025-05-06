package kr.it.code.main.productsale.repository;


import kr.it.code.main.productsale.entity.ProductSale;
import kr.it.code.main.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSaleRepository extends JpaRepository<ProductSale, Long> {

    //특정 유저의 판매내역 전체 조회
    List<ProductSale> findByUser_UserNo(Long userNo);
}
