package kr.it.code.main.location.service;

import kr.it.code.main.location.entity.MemberLocation;
import kr.it.code.main.location.repository.MemberLocationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.Optional;

@Service
public class MemberLocationService {

    private final MemberLocationRepository repository;

    @Value("${kakao.rest-api-key}")
    private String kakaoRestApiKey;  // 카카오맵 API의 REST API Key

    public MemberLocationService(MemberLocationRepository repository) {
        this.repository = repository;
    }

    // 위치 저장 (위도, 경도)
    public MemberLocation saveLocation(String memberId, Double latitude, Double longitude) {
        Optional<MemberLocation> existing = repository.findByMemberId(memberId);
        MemberLocation location = existing.orElse(new MemberLocation());
        location.setMemberId(memberId);
        location.setLatitude(latitude);
        location.setLongitude(longitude);

        return repository.save(location);
    }

    // 위치 조회 (위도, 경도)
    public Optional<MemberLocation> getLocation(String memberId) {
        // memberId를 기준으로 위치 정보를 가져옴
        return repository.findByMemberId(memberId);
    }

    // 위도, 경도로 주소 변환
    public String convertToAddress(Double latitude, Double longitude) {
        // 카카오 API의 주소 변환 URL
        String apiUrl = "https://dapi.kakao.com/v2/local/geo/coord2address.json";

        // 요청 URL 구성
        String url = String.format("%s?x=%f&y=%f", apiUrl, longitude, latitude);

        // 카카오 API 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoRestApiKey);  // 카카오 REST API Key
        headers.set("User-Agent", "YourAppName");  // User-Agent 추가
        headers.set("Origin", "http://localhost:3000");  // Origin (프론트엔드 주소)

        // RestTemplate을 사용한 GET 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            // 카카오 API 응답 받기
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // 응답 처리 및 주소 추출
            if (response.getStatusCode().is2xxSuccessful()) {
                String responseBody = response.getBody();
                return extractAddressFromResponse(responseBody);
            } else {
                return "주소 변환 실패: 응답 코드 " + response.getStatusCode();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "주소 변환 실패: " + e.getMessage();
        }
    }

    // 응답에서 주소만 추출하는 메소드
    private String extractAddressFromResponse(String response) {
        try {
            com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            JsonNode documentsNode = jsonNode.path("documents");

            if (documentsNode.isArray() && documentsNode.size() > 0) {
                JsonNode firstResult = documentsNode.get(0);
                JsonNode addressNode = firstResult.path("address");

                String address = addressNode.path("address_name").asText();
                return address.isEmpty() ? "주소 미확인" : address;
            } else {
                return "주소 변환 실패: 유효한 데이터가 없습니다.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "주소 변환 실패: " + e.getMessage();
        }
    }
}