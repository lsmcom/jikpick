package kr.it.code.main.location.controller;

import kr.it.code.main.location.entity.MemberLocation;
import kr.it.code.main.location.service.MemberLocationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@RestController
@RequestMapping("/api/location")
public class MemberLocationController {

    @Value("${kakao.rest-api-key}")
    private String kakaoRestApiKey;

    private final MemberLocationService service;

    public MemberLocationController(MemberLocationService service) {
        this.service = service;
    }

    // 위치 저장 API
    @PostMapping("/save")
    public MemberLocation saveLocation(@RequestParam String memberId,
                                       @RequestParam Double latitude,
                                       @RequestParam Double longitude) {
        return service.saveLocation(memberId, latitude, longitude);
    }

    // 위치 조회 API
    @GetMapping("/get")
    public MemberLocation getLocation(@RequestParam String memberId) {
        // 회원 ID에 해당하는 위치 정보를 가져옴
        Optional<MemberLocation> location = service.getLocation(memberId);
        if (location.isPresent()) {
            MemberLocation memberLocation = location.get();
            return memberLocation; // 반환 시 latitude, longitude, createdAt 포함
        } else {
            // 예외 처리 또는 null 반환
            return null;
        }
    }

    // 위도/경도로 주소 변환 API
    @GetMapping("/getaddress")
    public ResponseEntity<String> convertToAddress(@RequestParam Double latitude, @RequestParam Double longitude) {
        // 백엔드 IP를 직접 지정
        String callerIp = "localhost:9090"; // 추후 서버 배포한 후 ip 지정 넣을 것(kakaoMapApi 쪽 ip 등록에도 넣을 것)

        // 카카오 API URL
        String url = String.format("https://dapi.kakao.com/v2/local/geo/coord2address.json?x=%f&y=%f", longitude, latitude);

        // API 요청 헤더에 REST API 키 추가
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoRestApiKey);

        // callerIp를 헤더에 추가
        headers.set("callerIp", callerIp);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // RestTemplate을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);

        return response;
    }
}