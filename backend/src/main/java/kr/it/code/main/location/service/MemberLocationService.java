package kr.it.code.main.location.service;

import com.fasterxml.jackson.databind.JsonNode;
import kr.it.code.main.location.entity.MemberLocation;
import kr.it.code.main.location.repository.MemberLocationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@Service
public class MemberLocationService {

    private final MemberLocationRepository repository;

    @Value("${kakao.rest-api-key}")
    private String kakaoRestApiKey;

//    // SGIS API 인증 정보 (환경 변수로 설정)
//    @Value("${sgis.consumer-key}")
//    private String consumerKey;
//
//    @Value("${sgis.consumer-secret}")
//    private String consumerSecret;

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

    public String convertToAddress(Double latitude, Double longitude) {
        // 카카오 API의 주소 변환 URL
        String apiUrl = "https://dapi.kakao.com/v2/local/geo/coord2address.json";

        // API 요청 파라미터
        String url = String.format("%s?x=%f&y=%f", apiUrl, longitude, latitude);

        // 헤더 설정: 카카오 API 키
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoRestApiKey);

        // RestTemplate을 사용한 GET 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 카카오 API 응답을 받음
        ResponseEntity<String> response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);

        // 응답 처리 및 주소 추출
        if (response.getStatusCode().is2xxSuccessful()) {
            String responseBody = response.getBody();
            if (responseBody != null) {
                return extractAddressFromResponse(responseBody);
            }
        }
        return "주소 변환 실패";
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
                return "주소 변환 실패";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "주소 변환 실패";
        }
    }

//    // 위도, 경도로 주소 변환
//    public String convertToAddress(Double latitude, Double longitude) {
//        String apiUrl = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json";
//        String accessToken = getAccessToken();
//
//        // API 요청 파라미터
//        String url = String.format("%s?accessToken=%s&addr_type=20&x_coor=%f&y_coor=%f", apiUrl, accessToken, longitude, latitude);
//
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
//
//        // 응답 처리 및 주소 추출
//        if (response.getStatusCode().is2xxSuccessful()) {
//            String responseBody = response.getBody();
//            if (responseBody != null) {
//                return extractAddressFromResponse(responseBody);
//            }
//        }
//        return "주소 변환 실패";
//    }
//
//    // 응답에서 주소만 추출하는 메소드
//    private String extractAddressFromResponse(String response) {
//        // JSON 파싱을 위해 Jackson ObjectMapper 사용
//        try {
//            com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();
//            // 응답 JSON 파싱
//            JsonNode jsonNode = objectMapper.readTree(response);
//
//            // 결과에서 `emdong_nm` (행정동명) 추출
//            JsonNode resultNode = jsonNode.path("result");
//            JsonNode addressNode = resultNode.path(0); // 첫 번째 결과만 추출
//
//            // 주소 정보 (emdong_nm)
//            String emdongNm = addressNode.path("emdong_nm").asText();
//
//            // 반환: 주소
//            return emdongNm.isEmpty() ? "주소 미확인" : emdongNm;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "주소 변환 실패";
//        }
//    }

//    // 토큰을 가져오는 메소드 (SGIS API의 인증 토큰 요청)
//    private String getAccessToken() {
//        // SGIS 인증 API를 호출하여 access token을 가져옵니다.
//        String tokenUrl = "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json";
//        String url = String.format("%s?consumer_key=%s&consumer_secret=%s", tokenUrl, consumerKey, consumerSecret);
//
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
//
//        if (response.getStatusCode().is2xxSuccessful()) {
//            String responseBody = response.getBody();
//            if (responseBody != null) {
//                try {
//                    // JSON 파싱하여 accessToken 추출
//                    com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();
//                    JsonNode jsonNode = objectMapper.readTree(responseBody);
//                    String accessToken = jsonNode.path("result").path("accessToken").asText();
//
//                    return accessToken;
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//        return null;
//    }
}