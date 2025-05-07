package kr.it.code.main.favorite.service;

import kr.it.code.main.favorite.dto.FavoriteDto;
import kr.it.code.main.favorite.entity.Favorite;
import kr.it.code.main.favorite.repository.FavoriteRepository;
import kr.it.code.main.item.entity.Item;
import kr.it.code.main.user.User;
import kr.it.code.main.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    // 유저의 찜 목록 가져오기
    public List<FavoriteDto> getFavoritesByUser(Long userNo) {
        return favoriteRepository.findWithItemAndUserByUserNo(userNo).stream()
                .map(FavoriteDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 특정 상품에 대해 찜 여부 확인
    public boolean isFavorite(Long itemNo, Long userNo) {
        return favoriteRepository.existsByItem_ItemNoAndUser_UserNo(itemNo, userNo);
    }

    // 찜 추가
    public void addFavorite(Item item, Long userNo) {
        System.out.println("✅ itemNo: " + item.getItemNo());

        // 이미 찜했는지 확인
        boolean exists = favoriteRepository.existsByItem_ItemNoAndUser_UserNo(item.getItemNo(), userNo);
        if (exists) return;

        Favorite favorite = new Favorite();
        favorite.setItem(item);

        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
        favorite.setUser(user);
        favorite.setUserId(user.getUserId());

        // ✅ category도 명시적으로 세팅
        favorite.setCategory(item.getCategory());

        favoriteRepository.save(favorite);
    }

    // 찜 해제
    public void removeFavorite(Item item, Long userNo) {
        favoriteRepository.deleteByItem_ItemNoAndUser_UserNo(item.getItemNo(), userNo);
    }
}
