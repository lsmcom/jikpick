package kr.it.code.main.favorite.controller;

import kr.it.code.main.favorite.dto.FavoriteDto;
import kr.it.code.main.favorite.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping("/my")
    public ResponseEntity<List<FavoriteDto>> getMyFavorites(@RequestParam Long userNo) {
        List<FavoriteDto> list = favoriteService.getFavoritesByUser(userNo);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkIfLiked(
            @RequestParam Long itemNo,
            @RequestParam Long userNo) {
        boolean isLiked = favoriteService.isFavorite(itemNo, userNo);
        return ResponseEntity.ok(isLiked);
    }
}
