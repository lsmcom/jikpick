package kr.it.code.main.store.service;

import kr.it.code.main.store.dto.StoreDto;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreService {


    private final StoreRepository storeRepository;

    // 기존 메서드 덮어쓰기
    public List<StoreDto> getAllStores() {
        return storeRepository.findAllWithRegion().stream()
                .map(StoreDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<StoreDto> filterStores(String region, String subRegion, String name, String time) {
        if (region != null && region.isBlank()) region = null;
        if (subRegion != null && subRegion.isBlank()) subRegion = null;
        if (name != null && name.isBlank()) name = null;
        if (time != null && time.isBlank()) time = null;

        List<Store> stores = storeRepository.filterStoresWithRegion(
                region != null ? "%" + region + "%" : null,
                subRegion != null ? "%" + subRegion + "%" : null,
                name != null ? "%" + name + "%" : null,
                time
        );

        return stores.stream()
                .map(StoreDto::fromEntity)  // ✅ 정적 메서드 사용
                .toList();
    }

}
