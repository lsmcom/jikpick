package kr.it.code.main.store.repository;

import kr.it.code.main.store.entity.Store;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    // 여기에 추가해줘
    @Query("SELECT s FROM Store s JOIN FETCH s.region")
    List<Store> findAllWithRegion();

    @EntityGraph(attributePaths = {"region"})
    List<Store> findAll();  // region도 즉시 로딩해서 regNo 접근 가능하게 함

    @Query("""
    SELECT s FROM Store s
    LEFT JOIN FETCH s.region
    WHERE (:region IS NULL OR s.storeAddress LIKE :region)
    AND (:subRegion IS NULL OR s.storeAddress LIKE :subRegion)
    AND (:name IS NULL OR s.storeName LIKE :name)
    AND (:time IS NULL OR s.storeTime = :time)
    """)
    List<Store> filterStoresWithRegion(
            @Param("region") String region,
            @Param("subRegion") String subRegion,
            @Param("name") String name,
            @Param("time") String time
    );

    @Query("SELECT s FROM Store s LEFT JOIN FETCH s.region WHERE s.storeNo IN :storeNos")
    List<Store> findByStoreNoInWithRegion(@Param("storeNos") List<Long> storeNos);


}
