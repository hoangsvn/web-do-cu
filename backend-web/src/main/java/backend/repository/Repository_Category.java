package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.models.Category;
@Repository
public interface Repository_Category extends JpaRepository<Category, Long> {
	 
}
