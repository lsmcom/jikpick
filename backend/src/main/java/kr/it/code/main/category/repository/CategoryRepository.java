package kr.it.code.main.category.repository;

import kr.it.code.main.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAll();
    List<Category> findByCateParentNo(Long parentNo);
    List<Category> findByCateParentNoIsNull();



}
