package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.modal.Cart;
@Repository
public interface Repository_Cart extends JpaRepository<Cart, Long> {
	@Query("SELECT u FROM Cart u WHERE u.user_id = ?1 AND u.sanpham_id = ?2")
	List<Cart> findByUserIdAndSanphamId(Long userId, Long sanphamId);
}
