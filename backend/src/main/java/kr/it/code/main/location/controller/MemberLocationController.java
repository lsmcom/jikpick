//package kr.it.code.main.location.controller;
//
//import kr.it.code.main.location.entity.MemberLocation;
//import kr.it.code.main.location.service.MemberLocationService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/location")
//public class MemberLocationController {
//
//    private final MemberLocationService service;
//
//    public MemberLocationController(MemberLocationService service) {
//        this.service = service;
//    }
//
//    // 위치 저장 API
//    @PostMapping("/save")
//    public MemberLocation saveLocation(@RequestParam String memberId,
//                                       @RequestParam Double latitude,
//                                       @RequestParam Double longitude) {
//        return service.saveLocation(memberId, latitude, longitude);
//    }
//
//    // 위치 조회 API
//    @GetMapping("/get")
//    public MemberLocation getLocation(@RequestParam String memberId) {
//        // 회원 ID에 해당하는 위치 정보를 가져옴
//        Optional<MemberLocation> location = service.getLocation(memberId);
//        if (location.isPresent()) {
//            MemberLocation memberLocation = location.get();
//            return memberLocation; // 반환 시 latitude, longitude, createdAt 포함
//        } else {
//            // 예외 처리 또는 null 반환
//            return null;
//        }
//    }
//
//    // 위도/경도로 주소 변환 API
//    @GetMapping("/getaddress")
//    public String getAddress(@RequestParam Double latitude, @RequestParam Double longitude) {
//        return service.convertToAddress(latitude, longitude);
//    }
//}