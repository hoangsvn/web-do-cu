package backend.repository;

 
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import backend.modal.Image_Byte;

@ Repository
public interface Repository_Image_Byte extends JpaRepository<Image_Byte,  Long> {
	Optional<Image_Byte> findByLink(String Link);
}
