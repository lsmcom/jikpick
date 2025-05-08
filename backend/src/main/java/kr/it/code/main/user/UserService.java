package kr.it.code.main.user;

import kr.it.code.main.item.entity.Item;
import kr.it.code.main.item.repository.ItemRepository;
import kr.it.code.main.review.repository.ReviewRepository;
import kr.it.code.main.user.dto.JoinRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@Service // ✅ 서비스 계층을 나타내는 어노테이션
@RequiredArgsConstructor // ✅ 생성자 주입 자동 생성 (final 필드)
public class UserService {

    private final UserRepository userRepository; // ✅ 회원 데이터 접근 레포지토리
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // ✅ 비밀번호 암호화용 인스턴스
    private final ItemRepository itemRepository;
    private final ReviewRepository reviewRepository;

    @Value("C:\\jikpick_uploads\\")
    private String uploadDir;

    // 판매한 상품 수 (saleCount)
    public long getSaleCount(Long userNo) {
        return itemRepository.countItemsByUser(userNo); // ItemRepository에서 사용자별 상품 개수 카운트
    }

    // 등록된 리뷰 수 (reviewCount)
    public long getReviewCount(Long userNo) {
        List<Item> items = itemRepository.findByUserUserNo(userNo);
        long reviewCount = 0;

        for (Item item : items) {
            reviewCount += reviewRepository.findByItem_ItemNo(item.getItemNo()).size(); // 해당 상품에 대한 리뷰 수 카운트
        }

        return reviewCount;
    }

    // 평점 개수 (ratingCount) -> 리뷰 수와 동일
    public long getRatingCount(Long userNo) {
        return getReviewCount(userNo); // 리뷰 개수와 동일하게 계산
    }

    // ✅ 생년월일(String)을 LocalDate로 변환하는 메서드
    private LocalDate convertToBirthDate(String birth) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
            return LocalDate.parse(birth, formatter);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("생년월일 형식이 올바르지 않습니다. (예: 990101)", e);
        }
    }

    // ✅ 아이디 사용 가능 여부 체크 메서드 추가
    public boolean checkIdAvailable(String userId) {
        return !userRepository.existsByUserId(userId);
    }

    // ✅ 닉네임 사용 가능 여부 체크 추가
    public boolean checkNickAvailable(String nick) {
        return !userRepository.existsByNick(nick);
    }

    // 🔥 이름과 이메일로 아이디 찾기
    public String findUserId(String name, String email) {
        User user = userRepository.findByNameAndEmail(name, email);
        return (user != null) ? user.getUserId() : null;
    }

    // ✅ 회원가입 처리 메서드
    public void join(JoinRequestDto dto) {
        // 아이디 중복 체크
        if (!checkIdAvailable(dto.getId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // 닉네임 중복 체크
        if (!checkNickAvailable(dto.getNick())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }

        // User 엔티티 생성 및 값 세팅
        User user = new User();
        user.setUserId(dto.getId());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // 비밀번호 암호화해서 저장
        user.setEmail(dto.getEmail());
        user.setNick(dto.getNick());
        user.setName(dto.getName());
        user.setBirth(convertToBirthDate(dto.getBirth())); // 생년월일 변환 후 저장
        user.setTell(dto.getTell());
        user.setAgency(dto.getAgency());
        user.setSex(dto.getSex());
        user.setNational(dto.getNational());

        // DB에 저장
        userRepository.save(user);
    }

    // ✅ 비밀번호 재설정 기능
    public void resetPassword(String userId, String newPassword) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // ✅ 회원탈퇴 기능
    public void withdraw(String userId, String reason) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        // (optional) 탈퇴 사유를 로그로 남기거나 DB에 저장할 수 있음
        userRepository.delete(user);
    }

    // ✅ 변경된 회원정보만 변경 기능
    @Transactional
    public void updateUserInfo(String userId, Map<String, Object> updates) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        if (updates.containsKey("nickname")) {
            user.setNick((String) updates.get("nickname"));
        }

        if (updates.containsKey("email")) {
            user.setEmail((String) updates.get("email"));
        }

        if (updates.containsKey("tell")) {
            user.setTell((String) updates.get("tell"));
        }

        if (updates.containsKey("password")) {
            String raw = (String) updates.get("password");
            String encoded = new BCryptPasswordEncoder().encode(raw);
            user.setPassword(encoded);
        }

        if (updates.containsKey("intro")) {
            user.setIntro((String) updates.get("intro"));
        }

        if (updates.containsKey("image")) {
            user.setImage((String) updates.get("image"));
        }

        userRepository.save(user);
    }

    @Transactional
    public boolean updateProfile(String userId, String intro, String imagePath) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 프로필 이미지와 소개글 업데이트
        user.setIntro(intro);
        if(imagePath!=null && !imagePath.isBlank()) {
            user.setImage(imagePath);  // 이미지 경로 저장
        }
        userRepository.save(user);
        return true;
    }

    // 이미지 저장 처리 (파일을 서버에 저장하고 파일 경로 반환)
    public String saveImage(MultipartFile image) throws IOException {

        //resources 상 경로
        String imgPath = "/images/" +
                 "profiles/" + image.getOriginalFilename();

        //파일이저장되는 물리경로
        String imagePath =  uploadDir +
                "profiles" + File.separator +  image.getOriginalFilename(); // 경로 설정

        File dest = new File(imagePath);
        if(!dest.getParentFile().exists()){
            dest.getParentFile().mkdirs();
        }

        image.transferTo(dest); // 파일 저장
        return imgPath; // 저장된 파일 경로 반환
    }

    // 결제수단 저장
    @Transactional
    public void saveDefaultPayment(Long userNo, String paymentType, String paymentDetail) {
        User user = userRepository.findByUserNo(userNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        user.setDefaultPaymentType(paymentType);
        user.setDefaultPaymentDetail(paymentDetail);
    }

}
