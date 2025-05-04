package kr.it.code.main.favorite.service;

import kr.it.code.main.favorite.dto.FavoriteDto;
import kr.it.code.main.favorite.entity.Favorite;
import kr.it.code.main.favorite.repository.FavoriteRepository;
import kr.it.code.main.item.entity.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public List<FavoriteDto> getFavoritesByUser(Long userNo) {
        return favoriteRepository.findByUser_UserNo(userNo).stream()
                .map(FavoriteDto::fromEntity)
                .collect(Collectors.toList());
    }

    public boolean isFavorite(Long itemNo, Long userNo) {
        return favoriteRepository.existsByItem_ItemNoAndUser_UserNo(itemNo, userNo);
    }

    // 찜 추가
    public void addFavorite(Item item, Long userNo) {
        // ✅ 이미 찜했는지 확인 먼저!
        boolean exists = favoriteRepository.existsByItem_ItemNoAndUser_UserNo(item.getItemNo(), userNo);
        if (exists) return;

        Favorite favorite = new Favorite();
        favorite.setItem(item);
        favorite.setUser(item.getUser()); // 또는 userRepository.findById(userNo).get()
        favorite.setUserId(item.getUser().getUserId());
        if (favorite.getStore() == null) {
            throw new RuntimeException("해당 상품은 지점 정보가 없습니다.");
        }
        favorite.setCategory(item.getCategory());

        favoriteRepository.save(favorite);
    }

    // 찜 해제
    public void removeFavorite(Item item, Long userNo) {
        favoriteRepository.deleteByItem_ItemNoAndUser_UserNo(item.getItemNo(), userNo);
    }
}
