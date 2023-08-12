package backend.restcontrollers;
import java.util.HashMap;
import java.util.Map;
 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
import backend.repository.Repository_HinhAnh;

@CrossOrigin
@RestController
@RequestMapping("/api/hinhanh/")
public class REST_Controller_HinhAnh extends REST_Compoment {
	
	@Autowired
	private Repository_HinhAnh repository_HinhAnh;
	
	@GetMapping("/delid={id}")
	public ResponseEntity<?> DEByID(@PathVariable String id) {
			Map<String, Object> response = new HashMap<>();
			try {
				Long Fid = Long.parseLong(id);
				repository_HinhAnh.deleteById(Fid);
				response.put(info_message, rest_controller_success);
				return ResponseEntity.ok(response);
			} catch (Exception e) {
				response.clear();
				response.put(info_message, rest_controller_error);
				return ResponseEntity.badRequest().body(response);
			}
		
	}
	
}
