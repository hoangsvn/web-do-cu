package backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.models.Books;
 

@Repository
public interface Repository_Book extends JpaRepository<Books, Long> {
	  
	 Optional<Books> findById(Long id) ;

	 @Query("SELECT u FROM Books u WHERE UPPER(CONCAT(u.name)) LIKE CONCAT('%',UPPER(?1),'%') ")
	 List<Books> Search(String search);
	 
	 @Query("SELECT u FROM Books u WHERE u.link=?1 ")
	 Optional<Books> findByLink(String link) ;
		
}
