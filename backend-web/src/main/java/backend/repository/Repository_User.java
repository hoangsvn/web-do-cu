package backend.repository;
 
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import backend.modal.User;

@Repository
public interface Repository_User extends JpaRepository<User, Long> {
	
	
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	
	@Query("SELECT p FROM User p WHERE Concat(p.id,p.username,p.email) LIKE %:keyword%")
    List<User> searchByNameLike(String keyword);
 
}
