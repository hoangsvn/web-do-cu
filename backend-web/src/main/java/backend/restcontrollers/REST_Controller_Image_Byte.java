package backend.restcontrollers;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.modal.Image_Byte;
import backend.repository.Repository_Image_Byte;

@CrossOrigin
@RestController
@RequestMapping("/api/image")
public class REST_Controller_Image_Byte extends REST_Compoment {
	@Autowired
	private Repository_Image_Byte repository_Image_Byte;
	@GetMapping("/link={link}")
	public ResponseEntity<?> getHinhAnh(@PathVariable String link){
		try {
            Image_Byte ima = repository_Image_Byte.findByLink(link).get();
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).header(HttpHeaders.CONTENT_DISPOSITION).body(ima.getImagebyte());
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(image_not_found);
        } catch (Exception e) {
        	e.printStackTrace();
			return ResponseEntity.badRequest().body(rest_controller_error);
		}
	}
	@PostMapping("/upload")
	public ResponseEntity<?> getHinhAnh(@Valid @RequestParam("image")  MultipartFile image , @RequestParam("link")  String link){
		Map<String, Object> response = new HashMap<>();
		try {
			Image_Byte imgage = new Image_Byte();
			imgage.setId(-1l);
			imgage.setLink(link);
			imgage.setImagebyte(image.getBytes());
			imgage.setCreate_at(new Date());
			imgage = repository_Image_Byte.save(imgage);
			imgage.setImagebyte(null);
			response.put(info_image, imgage);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok().body(response);
		} 
		catch (DataIntegrityViolationException e) {
			response.clear();
			response.put(info_message, rest_controller_fail);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().body(response);
	}
	
	
	@GetMapping("/delid={id}")
	public ResponseEntity<?> DEByID(@PathVariable String id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Long Fid = Long.parseLong(id);
			repository_Image_Byte.deleteById(Fid);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.clear();
			response.put(info_message, rest_controller_error);
			return ResponseEntity.badRequest().body(response);
		}	
	}
	 
}
