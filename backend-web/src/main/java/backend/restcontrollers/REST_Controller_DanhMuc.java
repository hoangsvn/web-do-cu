package backend.restcontrollers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.modal.DanhMuc;
import backend.repository.Repository_DanhMuc;


@RestController
@CrossOrigin
@RequestMapping("/api/danhmuc")
public class REST_Controller_DanhMuc extends REST_Compoment {
	@Autowired
	private Repository_DanhMuc repository_DanhMuc;
	
	@GetMapping("/all")
	public ResponseEntity<?> GetDanhMucAll() {
		
		Map<String, Object> response = new HashMap<>();
		try {
			List<DanhMuc> listdm = repository_DanhMuc.findAll();
			response.put(info_danhmuc, listdm);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.clear();
			response.put(info_message, rest_controller_fail);
		}
		return ResponseEntity.badRequest().body(response);
		
		 
	}
	@GetMapping("/id={id}")
	public ResponseEntity<?> GetID(@PathVariable String id) {
		
		Map<String, Object> response = new HashMap<>();
		try {
			Long dmid = Long.parseLong(id);
			DanhMuc listdm = repository_DanhMuc.findById(dmid).get();
			response.put(info_danhmuc, listdm);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.clear();
			response.put(info_message, rest_controller_fail);
		}
		return ResponseEntity.badRequest().body(response);
		
		 
	}
	@GetMapping("/add={addstr}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> AddDanhMuc(@PathVariable String addstr) {
		
		Map<String, Object> response = new HashMap<>();
		try {
			 
			DanhMuc dm = new DanhMuc();
			dm.setId(-1l);
			dm.setName(addstr);
			dm = repository_DanhMuc.save(dm);
			response.put(info_danhmuc, dm);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.clear();
			response.put(info_message, rest_controller_fail);
		}
		return ResponseEntity.badRequest().body(response);
		
		 
	}
		
}
