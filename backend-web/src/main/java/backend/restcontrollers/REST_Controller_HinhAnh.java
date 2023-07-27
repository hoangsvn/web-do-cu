package backend.restcontrollers;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.modal.HinhAnh;
import backend.payload.response.Response_Message;
import backend.repository.Repository_HinhAnh;

@CrossOrigin
@RestController
@RequestMapping("/api/hinhanh/")
public class REST_Controller_HinhAnh {

	
	@Autowired
	private Repository_HinhAnh repository_HinhAnh;
	@GetMapping("link={link}")
	public ResponseEntity<?> getHinhAnh(@PathVariable String link){
		try {
            HinhAnh hinhanh = repository_HinhAnh.findByLink(link).get();
            byte[] data = Base64.getDecoder().decode(hinhanh.getBase64());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).header(HttpHeaders.CONTENT_DISPOSITION).body(data);
        } catch (NumberFormatException e) {
            return ResponseEntity.ok(new Response_Message("Img Not Found", "Hinh AnH by Links", false));
        }
	}
}
