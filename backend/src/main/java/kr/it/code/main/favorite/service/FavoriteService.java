package kr.it.code.main.favorite.service;

import kr.it.code.main.favorite.dto.FavoriteDto;
import kr.it.code.main.favorite.entity.Favorite;
import kr.it.code.main.favorite.repository.FavoriteRepository;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.store.entity.Store; // Store 클래스 임포트 추가
import kr.it.code.main.user.User;
import kr.it.code.main.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    public List<FavoriteDto> getFavoritesByUser(Long userNo) {
        return favoriteRepository.findWithItemAndUserByUserNo(userNo).stream()
                .map(FavoriteDto::fromEntity)
                .collect(Collectors.toList());
    }

    public boolean isFavorite(Long itemNo, Long userNo) {
        return favoriteRepository.existsByItem_ItemNoAndUser_UserNo(itemNo, userNo);
    }

    // 찜 추가
    public void addFavorite(Item item, Long userNo) {
        // ✅ 이미 찜했는지 확인
        boolean exists = favoriteRepository.existsByItem_ItemNoAndUser_UserNo(item.getItemNo(), userNo);
        if (exists) return;

        Favorite favorite = new Favorite();
        favorite.setItem(item);

        // ✅ 무조건 userNo로 유저 조회해서 넣기 (판매자 정보 말고)
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
        favorite.setUser(user);
        favorite.setUserId(user.getUserId());

        // ✅ 여러 지점 정보 확인
        Set<Store> stores = item.getStores(); // 여러 Store 객체를 받아옴
        if (stores == null || stores.isEmpty()) {
            throw new RuntimeException("해당 상품은 지점 정보가 없습니다.");
        }

        // 여러 지점 정보를 Favorite에 추가
        for (Store store : stores) {
            favorite.setStore(store); // 지점마다 설정
            favoriteRepository.save(favorite); // 각각 저장
        }
    }

    // 찜 해제
    public void removeFavorite(Item item, Long userNo) {
        favoriteRepository.deleteByItem_ItemNoAndUser_UserNo(item.getItemNo(), userNo);
    }
}
