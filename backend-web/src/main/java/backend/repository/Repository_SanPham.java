package backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.modal.SanPham;
@Repository
public interface Repository_SanPham extends JpaRepository<SanPham, Long> {

	List<SanPham> findTop20ByOrderById();
 
	@Query("SELECT u From SanPham u Where u.id = ?1 and u.user_id = ?2 ")
	List<SanPham> findByIdAndUser_id(Long id ,Long user_id);
	
	
	@Query("SELECT p FROM SanPham p WHERE p.name LIKE %:keyword%")
    List<SanPham> searchByNameLike(String keyword);
	
	
	@Query("SELECT p FROM SanPham p WHERE concat(p.name,p.price,p.id) LIKE %:keyword%")
    List<SanPham> searchByAllLike(String keyword);
	
}
