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
        List<Store> stores = storeRepository.filterStoresWithRegion(  // ✅ 여기!
                region != null && !region.isEmpty() ? region : null,
                subRegion != null && !subRegion.isEmpty() ? subRegion : null,
                name != null && !name.isEmpty() ? name : null,
                time != null && !time.isEmpty() ? time : null
        );
        return stores.stream().map(StoreDto::fromEntity).collect(Collectors.toList());
    }

}
