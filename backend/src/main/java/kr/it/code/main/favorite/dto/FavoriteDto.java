package kr.it.code.main.favorite.dto;

import kr.it.code.main.favorite.entity.Favorite;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteDto {

    private Long itemNo;
    private String itemName;
    private int itemCost;
    private String itemImage;
    private Long favNo;

    public static FavoriteDto fromEntity(Favorite fav) {
        FavoriteDto dto = new FavoriteDto();
        dto.setItemNo(fav.getItem().getItemNo());
        dto.setItemName(fav.getItem().getItemName());
        dto.setItemCost(fav.getItem().getItemCost());
        dto.setItemImage(fav.getItem().getItemImage());
        dto.setFavNo(fav.getFavNo());
        return dto;
    }
}
