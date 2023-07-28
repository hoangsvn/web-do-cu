package backend.repository;

 

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.modal.SanPham;
@Repository
public interface Repository_SanPham extends JpaRepository<SanPham, Long> {

	List<SanPham> findTop20ByOrderById();
 
}
