package kr.it.code.main.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

// ✅ 모든 컨트롤러에서 발생하는 예외를 잡아줄 클래스
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ✅ DTO 검증 실패했을 때(MethodArgumentNotValidException) 잡는 메서드
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        // 검증 에러가 여러 개일 수 있으니 for문으로 다 돌려줌
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField(); // 어떤 필드에서 오류났는지
            String errorMessage = error.getDefaultMessage();    // 에러 메시지
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errors); // 🔥 에러 내용을 깔끔한 JSON으로 반환
    }
}
