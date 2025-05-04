//package kr.it.code.main.location.repository;
//
//import kr.it.code.main.location.entity.MemberLocation;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface MemberLocationRepository extends JpaRepository<MemberLocation, Long> {
//    Optional<MemberLocation> findByMemberId(String memberId);
//}