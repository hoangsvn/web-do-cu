package backend.restcontrollers;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import backend.payload.response.*;

@CrossOrigin
@RestController
@RequestMapping("/backend")
public class REST_Controller_Backend {
	
	
	@GetMapping("/error={type}")
	public  ResponseEntity<?> Error(@PathVariable String type) {
		return ResponseEntity.ok(new Response_Message(type,"Error page!",false));
	}
	@GetMapping("/connect")
	public  ResponseEntity<?> Contect() {
		return ResponseEntity.ok(new Response_Message("Connect Success","Test Connect",true));
	}
	
}
