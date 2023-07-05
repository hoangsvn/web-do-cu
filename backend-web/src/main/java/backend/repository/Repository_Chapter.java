
package backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import backend.models.Chapter;

@Repository
public interface Repository_Chapter extends JpaRepository<Chapter, Long> {

	@Query("SELECT COUNT(u) FROM Chapter u WHERE u.bookid = ?1")
	Long countChapter(Long bookid);

	@Query("SELECT u FROM Chapter u WHERE u.id = ?1")
	Chapter FindOne(Long id);

	@Query("SELECT new Chapter(u.id , u.bookid , u.name , u.create_at )   FROM Chapter u WHERE u.bookid = ?1")
	List<Chapter> FindList(Long id);

	@Query("SELECT u FROM Chapter u WHERE u.id = ?1 and u.bookid= ?2 ")
	Chapter FindOneByIdAndBookid(Long cid, Long bookid);

}
