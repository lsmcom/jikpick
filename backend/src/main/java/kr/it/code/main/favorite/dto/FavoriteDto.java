package kr.it.code.main.favorite.dto;

import kr.it.code.main.favorite.entity.Favorite;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteDto {

    private Long itemNo;
    private String itemName;
    private String itemImage;
    private Integer itemWish;
    private Integer itemCost;
    private String pickStatus;
    private String sellerNick;

    public static FavoriteDto fromEntity(Favorite fav) {
        var item = fav.getItem();
        FavoriteDto dto = new FavoriteDto();
        dto.setItemNo(item.getItemNo());
        dto.setItemName(item.getItemName());
        dto.setItemImage(item.getImagePathList());
        dto.setItemWish(item.getItemWish());
        dto.setItemCost(item.getItemCost());
        dto.setPickStatus(item.getPickStatus());
        dto.setSellerNick(item.getUser().getNick());
        return dto;
    }
}
