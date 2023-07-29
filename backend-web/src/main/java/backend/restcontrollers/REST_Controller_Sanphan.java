package backend.restcontrollers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.modal.HinhAnh;
import backend.modal.SanPham;
import backend.repository.Repository_SanPham;
import backend.security.services.UserDetailsImpl;
 

@CrossOrigin
@RestController
@RequestMapping("/api/sanpham/")
public class REST_Controller_Sanphan extends REST_Compoment {

	@Autowired
	private Repository_SanPham repository_SanPham;
 

	@GetMapping("id={id}")
	public ResponseEntity<?> GetByID(@PathVariable Long id) {

		try {
			SanPham sp = repository_SanPham.findById(id).get();
			return ResponseEntity.ok(sp);
		} catch (Exception e) {
			return ResponseEntity.status(404).body(sanpham_is_number);
		}
		
	}
	@GetMapping("top20")
	public ResponseEntity<?> GetSanPhamTopN() {

		try {
			List<SanPham> listsp = repository_SanPham.findTop20ByOrderById();
			return ResponseEntity.ok(listsp);
		} catch (Exception e) {
			return ResponseEntity.status(404).body(sanpham_is_number);
		}
		
	}

	@GetMapping("delete/id={id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> DeleteByID(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			List <SanPham> lsp =repository_SanPham.findAllByIdAndUserid(id, userDetails.getId());
			if (!lsp.isEmpty()) {
				repository_SanPham.deleteById(id);
				response.put("sanpham", id);
				response.put("message", delete_sanpham_success);
				return ResponseEntity.ok(response);
			} else {
				response.put("message", sanpham_isnot_exists_in_mysql);
				return ResponseEntity.status(404).body(response);
			}
			
		} catch (Exception e) {

			response.clear();
			response.put("message", delete_sanpham_fail);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("update")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> UpdateByID(@Valid @RequestBody SanPham sp) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (repository_SanPham.existsById(sp.getId())) {
				SanPham updatedProduct = repository_SanPham.saveAndFlush(sp);
				response.put("sanpham", updatedProduct);
				response.put("message", update_sanpham_success);
				return ResponseEntity.ok(response);
			} else {
				response.put("message",sanpham_is_exists_in_mysql);
				return ResponseEntity.ok(response);
			}

		} catch (Exception e) {
			response.clear();
			response.put("message", update_sanpham_error);
			return ResponseEntity.status(404).body(response);
		} 
		 

	}

	
	@PostMapping("add")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> AddByID(@Valid @RequestBody SanPham sp) {
		Map<String, Object> response = new HashMap<>();
		try {
			List<HinhAnh> listha = sp.getListhinhanh();
			sp.setId(-1L);
			sp.setUser_id(getUserDetailsImplInAuthentcation().getId());
			SanPham savesp = repository_SanPham.save(sp);
			for (HinhAnh A: listha) {
				A.setId(-1L);
				A.setSanpham_id(savesp.getId());
			}
			savesp.setListhinhanh(listha);
			savesp = repository_SanPham.save(savesp);
			response.put("sanpham", savesp);
			response.put("message", insert_sanpham_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.clear();
			response.put("message", insert_sanpham_error);
			return ResponseEntity.status(404).body(response);
		}
	}
	

}
