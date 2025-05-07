package kr.it.code.main.item.dto;

import kr.it.code.main.item.entity.Item;
import kr.it.code.main.store.entity.Store;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ItemDto {

    private Long itemNo;
    private String itemName;
    private Integer itemCost;
    private String itemImage; // 대표 이미지
    private List<String> imagePathList; // 나머지 이미지들

    private Integer itemWish;
    private Long storeNo; // 여기서 첫 번째 storeNo를 가져오는 것으로 수정

    private Integer pickPeriod;

    // ✅ 상세 페이지용 필드 추가
    private String itemInfo;
    private String itemStatus;
    private LocalDate itemDate;

    private String sellerNick;
    private String categoryName;
    private List<String> imagePaths;

    public ItemDto(Item item) {
        this.itemNo = item.getItemNo();
        this.itemName = item.getItemName();
        this.itemCost = item.getItemCost();

        // ✅ 나머지 이미지들
        this.imagePaths = item.getImagePathList() != null
                ? Arrays.asList(item.getImagePathList().split(","))
                : List.of();
        this.itemWish = item.getItemWish();

        // ✅ 첫 번째 지점의 storeNo만 사용 (여러 개일 수 있음)
        this.storeNo = item.getStores() != null && !item.getStores().isEmpty() ?
                item.getStores().iterator().next().getStoreNo() : null; // 첫 번째 storeNo만 가져옴

        // ✅ 추가 필드 값 주입
        this.itemInfo = item.getItemInfo();
        this.itemStatus = item.getItemStatus();
        this.itemDate = item.getItemDate();

        this.sellerNick = item.getUser().getNick();
        this.categoryName = item.getCategory().getCateName();
    }
}
