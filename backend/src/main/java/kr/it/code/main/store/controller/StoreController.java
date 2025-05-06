package kr.it.code.main.store.controller;

import kr.it.code.main.store.dto.StoreDto;
import kr.it.code.main.store.entity.Store;
import kr.it.code.main.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    // 지점 가져오기
    @GetMapping
    public ResponseEntity<List<StoreDto>> getAllStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    // 지역 필터링
    @GetMapping("/filter")
    public ResponseEntity<List<StoreDto>> filterStores(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String subRegion,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String time
    ) {
        List<StoreDto> result = storeService.filterStores(region, subRegion, name, time);
        return ResponseEntity.ok(result);
    }
}
