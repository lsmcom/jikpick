package kr.it.code.main.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// ✅ User 엔티티를 관리하는 JPA Repository 인터페이스
// - JpaRepository<User, Long> : User 엔티티, 기본키 타입(Long) 지정
public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ 아이디 중복 여부 체크 메서드
    boolean existsByUserId(String userId);

    // ✅ 닉네임 중복 여부 체크 메서드
    boolean existsByNick(String nick);

    // ✅ 아이디로 User 가져오는 메서드 (String id)
    Optional<User> findByUserId(String userId); // 🔥 이거 하나 추가

    // 🔥 이름과 이메일로 사용자 찾기
    User findByNameAndEmail(String name, String email);

    // 🔥 아이디, 이름과 이메일로 비밀번호 찾기
    User findByUserIdAndNameAndEmail(String userId, String name, String email);
}
