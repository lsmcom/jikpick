package kr.it.code.main.productlikes.service;


import kr.it.code.main.productlikes.repository.ProductLikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductLikesService {

    private final ProductLikesRepository productLikesRepository;


    public long countLikesByItem(Long itemNo) {
        return productLikesRepository.countByItem_ItemNo(itemNo);
    }
}
