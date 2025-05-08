package kr.it.code.main.store.dto;

import kr.it.code.main.store.entity.Store;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreDto {

    private Long storeNo;
    private String storeName;
    private String storeTell;
    private String storeTime;
    private String storeAddress;  // 도로명 주소
    private String lotAddress;    // 지번 주소
    private Long regNo;
    // 필요시 추가: 지역번호, 상품위치, 담당자명 등도 가능
    // private Long regNo;
    // private String itemLocation;
    // private String storeManager;

    // 💡 Entity → Dto 변환
    public static StoreDto fromEntity(Store store) {
        System.out.println("✅ 변환 시작: " + store.getStoreNo());

        StoreDto dto = new StoreDto();
        dto.setStoreNo(store.getStoreNo());
        dto.setStoreName(store.getStoreName());
        dto.setStoreTell(store.getStoreTell());
        dto.setStoreTime(store.getStoreTime());
        dto.setStoreAddress(store.getStoreAddress());
        dto.setLotAddress(store.getLotAddress());

        if (store.getRegion() != null) {
            dto.setRegNo(store.getRegion().getRegNo());
        } else {
            dto.setRegNo(null);
        }

        return dto;
    }
}
