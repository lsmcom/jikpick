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

        Item item = sale.getItem();
        if ("숨김".equals(item.getPickStatus())) {
            item.setPickStatus(null);
        } else {
            item.setPickStatus("숨김");
        }
        itemRepository.save(item); // 또는 sale 안에서 Cascade 설정되어 있다면 save는 생략 가능

    }

    @Transactional(readOnly = true)
    public List<MysaleDto> getSalesByUser(Long userNo) {
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다"));

        List<ProductSale> sales = productSaleRepository.findByUser_UserNo(userNo);

        return sales.stream()
                .filter(sale -> sale.getItem() != null) // ✅ Item이 없는 경우 제거
                .map(sale -> {
                    Item item = sale.getItem();
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
                            .build();
                })
                .collect(Collectors.toList());
    }


    public void deleteSale(Long saleNo) {
        if (!productSaleRepository.existsById(saleNo)) {
            throw new IllegalArgumentException("존재하지 않는 판매내역입니다.");
        }
        productSaleRepository.deleteById(saleNo);
    }
}


