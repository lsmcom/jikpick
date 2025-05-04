package kr.it.code.main.favorite.dto;

import kr.it.code.main.favorite.entity.Favorite;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteDto {

    private Long itemNo;       // item.id
    private String itemName;   // item.name
    private String itemImage;  // item.image
    private Integer itemWish;  // item.likes
    private Integer itemCost;  // item.price
    private String pickStatus; // item.status

    public static FavoriteDto fromEntity(Favorite fav) {
        var item = fav.getItem();
        FavoriteDto dto = new FavoriteDto();
        dto.setItemNo(item.getItemNo());
        dto.setItemName(item.getItemName());
        dto.setItemImage(item.getItemImage());
        dto.setItemWish(item.getItemWish());
        dto.setItemCost(item.getItemCost());
        dto.setPickStatus(item.getPickStatus());
        return dto;
    }
}
