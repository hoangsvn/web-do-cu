package backend.restcontrollers;

import java.util.Date;

 
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
 
import backend.models.Chapter;
import backend.payload.request.Request_Chapter;
import backend.payload.response.Response_Message;
import backend.repository.Repository_Book;
import backend.repository.Repository_Chapter;

@CrossOrigin
@RestController
@RequestMapping("/api/chapter")
public class REST_Controller_Chapter {
 
	@Autowired
	private Repository_Chapter chapterRepository;
	
	@Autowired
	private Repository_Book repository_Book;
	
 
	@PostMapping("/add")
	public  ResponseEntity<?> ChapterAdd(@Valid @RequestBody Request_Chapter chapter) {
		
		if (repository_Book.existsById(chapter.getBookid())) {
			try {
				
				Chapter chap = new Chapter();
				chap.setName(chapter.getName() );
				chap.setCreate_at(new Date());
				chap.setContent(chapter.getContent());
				chap.setBookid(chapter.getBookid());
				chapterRepository.save(chap);
				return ResponseEntity.ok(new Response_Message("ChapTer Add successfull!","Add Chapter",true));
			} catch (Exception e) {
				return ResponseEntity.ok(new Response_Message("ChapTer Add Error!","Add Chapter",false));
			}
		} else {
			return ResponseEntity.ok(new Response_Message("Book ID Not Found!","Add Chapter",false));
		}
		
	}
	@GetMapping("/bookid={id}")
	public  ResponseEntity<?> Allchapter(@PathVariable String  id) {
		try {
			String  gson = new Gson().toJson(chapterRepository.FindList(Long.parseLong(id)));
			return ResponseEntity.ok(gson);
		} catch (NumberFormatException e) {
			return ResponseEntity.ok(new Response_Message("Chapter ID Is Mumber!","ID Chapter",true));
		}
	}
	@GetMapping("/bookid={id}/chapter={cid}")
	public  ResponseEntity<?> IdChapter(@PathVariable String  id ,@PathVariable String  cid) {
		try {
			Long id1  = Long.parseLong(id);
			Long id2  = Long.parseLong(cid);
			if (repository_Book.existsById(id1) && chapterRepository.existsById(id2) ) {
				try { 
					return ResponseEntity.ok(new Gson().toJson(chapterRepository.FindOneByIdAndBookid(id2,id1)));
				} catch (Exception e) {
					return ResponseEntity.ok(new Response_Message("Error Chapter!","ID Chapter",false));
				}
			} else {
				return ResponseEntity.ok(new Response_Message("Book ID or Chapter ID Not Found !","ID Chapter",false));
			}
		}
		catch (NumberFormatException e) {
			return ResponseEntity.ok(new Response_Message("Book ID or Chapter ID Is Mumber!","ID Chapter",false));
		}
	}
	
}
