package kr.it.code.main.item.dto;

import kr.it.code.main.item.entity.Item;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemLikeDto {
    private ItemDto item;       // 상품 정보
    private long likeCount;  // 좋아요 수

    // 생성자
    public ItemLikeDto(Item item, long likeCount) {
        this.item = new ItemDto(item);
        this.likeCount = likeCount;
    }
}
