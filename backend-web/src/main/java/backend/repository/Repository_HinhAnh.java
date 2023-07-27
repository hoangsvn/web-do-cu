package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import backend.modal.HinhAnh;



@Repository
public interface Repository_HinhAnh extends JpaRepository<HinhAnh,  Long>{
	Optional<HinhAnh>  findByLink(String link);
}
