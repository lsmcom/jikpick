package kr.it.code.main.store.service;

import kr.it.code.main.store.entity.Store;
import kr.it.code.main.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Store getStoreById(Long storeNo) {
        return storeRepository.findById(storeNo)
                .orElseThrow(() -> new IllegalArgumentException("지점 정보를 찾을 수 없습니다."));
    }
}
