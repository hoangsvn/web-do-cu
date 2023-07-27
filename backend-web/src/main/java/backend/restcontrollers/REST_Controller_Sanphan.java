package backend.restcontrollers;

import java.util.HashMap;
 
import java.util.Map;

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
import backend.modal.SanPham;
import backend.payload.response.Response_Message;
import backend.repository.Repository_SanPham;

@CrossOrigin
@RestController
@RequestMapping("/api/sanpham/")
public class REST_Controller_Sanphan {

	@Autowired
	private Repository_SanPham repository_SanPham;

	@GetMapping("id={id}")
	public ResponseEntity<?> GetByID(@PathVariable Long id) {

		try {
			SanPham sp = repository_SanPham.findById(id).get();
			return ResponseEntity.ok(sp);
		} catch (Exception e) {

		}
		return ResponseEntity.status(404).body(new Response_Message("Sanpham ID Is Mumber!", "Find Sanpham by Id", false));
	}
	@GetMapping("topn={n}")
	public ResponseEntity<?> GetSanPhamTopN(@PathVariable Long n) {

		try {
//			List<SanPham> listsp = repository_SanPham.findTopN(n);
			return ResponseEntity.ok(null);
		} catch (Exception e) {

		}
		return ResponseEntity.status(404)
				.body(new Response_Message("Sanpham ID Is Mumber!", "Find Sanpham by Id", false));
	}

	@GetMapping("delete/id={id}")
	public ResponseEntity<?> DeleteByID(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			repository_SanPham.deleteById(id);
			response.put("sanpham", null);
			response.put("message", new Response_Message("Delete Success !", "Delete Sanpham ID", true));
			return ResponseEntity.ok(response);
		} catch (Exception e) {

			response.clear();
			response.put("message", new Response_Message("Delete Fail!", "Sanpham ID Not Found", false));
			return ResponseEntity.status(404).body(response);
		}
		

	}

	@PostMapping("update")
	public ResponseEntity<?> UpdateByID(@Valid @RequestBody SanPham sp) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (repository_SanPham.existsById(sp.getId())) {
				SanPham updatedProduct = repository_SanPham.saveAndFlush(sp);
				
				response.put("sanpham", updatedProduct);
				response.put("message", new Response_Message("Update  Success !", "Update Sanpham ID", true));
				return ResponseEntity.ok(response);
			} else {
				response.put("message",new Response_Message("Update Fail!", "Sanpham is not Exists", false));
				return ResponseEntity.ok(response);
			}

		} catch (Exception e) {
			response.clear();
			response.put("message", new Response_Message("Update Error!", "Error", false));
			return ResponseEntity.status(404).body(response);
		}
		 

	}

	@PostMapping("add")
	public ResponseEntity<?> AddByID(@Valid @RequestBody SanPham sp) {
		Map<String, Object> response = new HashMap<>();
		try {
			sp.setId(-1L);
			SanPham add = repository_SanPham.saveAndFlush(sp);
			response.put("sanpham", add);
			response.put("message", new Response_Message("Add Success!", "Add by Id", true));
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.clear();
			response.put("message", new Response_Message("Add Fail!", "Add by Id", false));
			return ResponseEntity.status(404).body(response);
		}
		

	}

}
