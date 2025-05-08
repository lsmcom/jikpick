package kr.it.code.main.purchase.service;

import kr.it.code.main.purchase.dto.PurchaseDto;
import kr.it.code.main.purchase.repository.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;

    public List<PurchaseDto> getUserPurchaseList(Long userNo) {
        return purchaseRepository.findUserPurchaseListFetch(userNo)
                .stream()
                .map(PurchaseDto::new)
                .collect(Collectors.toList());
    }
}
