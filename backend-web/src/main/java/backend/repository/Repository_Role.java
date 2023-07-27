package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.modal.ERole;
import backend.modal.Role;

@Repository
public interface Repository_Role extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
