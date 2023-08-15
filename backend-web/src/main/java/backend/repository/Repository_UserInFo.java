package backend.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import backend.modal.UserInFo;

public interface Repository_UserInFo extends JpaRepository<UserInFo, Long> {
	Optional<UserInFo> findByUserid(Long userid);
}
