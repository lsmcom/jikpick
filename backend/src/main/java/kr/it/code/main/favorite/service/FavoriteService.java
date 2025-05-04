package kr.it.code.main.favorite.service;

import kr.it.code.main.favorite.dto.FavoriteDto;
import kr.it.code.main.favorite.repository.FavoriteRepository;
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
}
