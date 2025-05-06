package kr.it.code.main.upload;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/api/upload")
public class FileUploadController {

    // application.yml의 업로드 경로 주입
    @Value("${server.stored.file.path}")
    private String uploadDir;

    // POST 요청으로 이미지 파일 업로드 받기
    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 비어 있습니다.");
        }

        try {
            // 원본 파일명 정리
            String originalName = StringUtils.cleanPath(file.getOriginalFilename());

            // 고유한 저장 파일명 생성
            String uuid = UUID.randomUUID().toString();
            String savedName = uuid + "_" + originalName;

            // 실제 저장 경로 설정
            File dest = new File(uploadDir + savedName);
            file.transferTo(dest);

            // 저장된 경로 반환 (프론트에서 미리보기용으로 사용 가능)
            return ResponseEntity.ok("/files/uploads/" + savedName);

        } catch (IOException e) {
            log.error("파일 업로드 실패", e);
            return ResponseEntity.internalServerError().body("파일 업로드 실패");
        }
    }
    @DeleteMapping
    public ResponseEntity<String> deleteImage(@RequestParam String path) {
        try {
            String uploadPath = "C:/files/uploads/" + path;
            File file = new File(uploadPath);

            if (file.exists()) {
                if (file.delete()) {
                    return ResponseEntity.ok("삭제 성공");
                } else {
                    return ResponseEntity.status(500).body("파일 삭제 실패");
                }
            } else {
                return ResponseEntity.status(404).body("파일이 존재하지 않음");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 오류");
        }
    }

}
