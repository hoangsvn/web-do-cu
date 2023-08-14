package backend.repository;

 
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
 
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import backend.modal.Image_Byte;

@ Repository
public interface Repository_Image_Byte extends JpaRepository<Image_Byte,  Long> {
	Optional<Image_Byte> findByLink(String Link);
	
	

    Boolean existsByLink(String link);
  
    @Query("SELECT u.link FROM Image_Byte u")
	List<String> getListStringLink();
    
    
    @Query("SELECT u.id FROM Image_Byte u WHERE u.link=:link")
	Long getIDbyLink( String link);
//    
// 
//    @Query("DELETE FROM Image_Byte u WHERE u.link = :link")
//    void deleteByLink(String link);
    
 

}
