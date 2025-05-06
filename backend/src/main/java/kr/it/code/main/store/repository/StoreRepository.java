package kr.it.code.main.store.repository;

import kr.it.code.main.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query(value = "SELECT * FROM store s WHERE " +
            "(:region IS NULL OR s.STORE_ADDRESS LIKE CONCAT('%', :region, '%')) AND " +
            "(:subRegion IS NULL OR s.STORE_ADDRESS REGEXP CONCAT('(^|\\\\s)', :subRegion, '(\\\\s|$)')) AND " +
            "(:name IS NULL OR s.STORE_NAME LIKE CONCAT('%', :name, '%')) AND " +
            "(:time IS NULL OR s.STORE_TIME = :time)",
            nativeQuery = true)
    List<Store> filterStores(
            @Param("region") String region,
            @Param("subRegion") String subRegion,
            @Param("name") String name,
            @Param("time") String time);
}
