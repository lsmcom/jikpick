package kr.it.code.main.productsale.service;

import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import kr.it.code.main.productsale.dto.MysaleDto;
import kr.it.code.main.productsale.entity.ProductSale;
import kr.it.code.main.productsale.repository.ProductSaleRepository;
import kr.it.code.main.user.User;
import kr.it.code.main.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductSaleService {

    private final ProductSaleRepository productSaleRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository; // ✅ 추가

    @Transactional
    public void toggleHideStatus(Long saleNo) {
        ProductSale sale = productSaleRepository.findById(saleNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 판매내역입니다."));

        String current = sale.getStatus();
        sale.setStatus("숨김".equals(current) ? "판매중" : "숨김");
    }


    @Transactional(readOnly = true)
    public List<MysaleDto> getSalesByUser(Long userNo) {
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다"));

        List<ProductSale> sales = productSaleRepository.findByUser_UserNo(userNo);

        return sales.stream()
                .filter(sale -> sale.getItem() != null) // ✅ Item이 없는 경우 제거
                .map(sale -> {
                    Item item = itemRepository.findById(sale.getItem().getItemNo())
                            .orElse(null);
                    if (item == null) return null; // 이후 filter에서 제거하거나 예외처리
                    return MysaleDto.builder()
                            .saleNo(sale.getSaleNo())
                            .itemNo(item.getItemNo())
                            .itemName(item.getItemName())
                            .itemCost(item.getItemCost())
                            .regionName(sale.getStore().getRegion().getRegName() + " " + sale.getStore().getStoreName())
                            .itemImage(item.getFirstImagePath())
                            .itemWishCount(item.getItemWish())
                            .saleDate(sale.getSaleDate().toString())
                            .pickStatus(item.getPickStatus())
                            .status(sale.getStatus())
                            .build();
                })
                .collect(Collectors.toList());
    }


    @Transactional
    public void deleteSale(Long saleNo) {
        ProductSale sale = productSaleRepository.findById(saleNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 판매내역입니다."));

        productSaleRepository.delete(sale);
    }



}


