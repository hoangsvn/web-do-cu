package backend.restcontrollers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

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

import backend.BackEnd;
import backend.modal.HinhAnh;
import backend.modal.SanPham;
import backend.payload.request.Resquest_sanpham;
import backend.repository.Repository_SanPham;
import backend.security.services.UserDetailsImpl;
 

@CrossOrigin
@RestController
@RequestMapping("/api/sanpham")
public class REST_Controller_Sanphan extends REST_Compoment {

	@Autowired
	private Repository_SanPham repository_SanPham;
 

	@GetMapping("/id={id}")
	public ResponseEntity<?> GetByID(@PathVariable String id) {
		
		Map<String, Object> response = new HashMap<>();
		try {
			
			Long Fid = Long.parseLong(id);
			if(repository_SanPham.existsById(Fid)) {
				SanPham sp = repository_SanPham.findById(Fid).get();
				response.put(info_sanpham, sp);
				response.put(info_message, rest_controller_success);
			} else {
				response.put(info_message, sanpham_isnot_exists_in_mysql);
			}
			
			return ResponseEntity.ok(response);
		} 
		catch (NoSuchElementException e) {
			response.clear();
			response.put(info_message, rest_controller_fail);
			 
		}
		catch (NumberFormatException e) {
			response.clear();
			response.put(info_message, sanpham_is_number);
			 
		}
		catch (Exception e) {
			response.clear();
			response.put(info_message, rest_controller_error);
			
		}
		return ResponseEntity.status(404).body(response);
		
	}
	@GetMapping("top20")
	public ResponseEntity<?> GetSanPhamTopN() {

		try {
			List<SanPham> listsp = repository_SanPham.findTop20ByOrderById();
			return ResponseEntity.ok(listsp);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(rest_controller_error);
		}
		
	}

	@GetMapping("/delete/id={id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> DeleteByID(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			List <SanPham> lsp =repository_SanPham.findByIdAndUser_id(id, userDetails.getId());
			if (!lsp.isEmpty()) {
				repository_SanPham.deleteById(id);
				response.put(info_sanpham, id);
				response.put(info_message, delete_sanpham_success);
				return ResponseEntity.ok(response);
			} else {
				response.put(info_message, sanpham_isnot_exists_in_mysql);
				return ResponseEntity.badRequest().body(response);
			}
			
		} catch (Exception e) {

			response.clear();
			response.put(info_message, delete_sanpham_fail);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/update")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> UpdateByID(@Valid @RequestBody SanPham sp) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (repository_SanPham.existsById(sp.getId())) {
				SanPham updatedProduct = repository_SanPham.saveAndFlush(sp);
				response.put(info_sanpham, updatedProduct);
				response.put(info_message, update_sanpham_success);
				
			} else {
				response.put(info_message,sanpham_is_exists_in_mysql);
			}
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			response.clear();
			response.put(info_message, update_sanpham_error);
		} 
		return ResponseEntity.badRequest().body(response);
		
	}

	
	@PostMapping("/add")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> AddByID(@Valid @RequestBody Resquest_sanpham sp) {
		 
		Map<String, Object> response = new HashMap<>();
		try {
			UserDetailsImpl userDetail = getUserDetailsImplInAuthentcation();
			SanPham spsave = new SanPham();
			spsave.setId(-1l);
			spsave.setName(sp.getName());
			spsave.setCreate_at(new Date());
			spsave.setUser_id(userDetail.getId());
			spsave.setPrice(sp.getPrice());
			spsave.setDesiption(sp.getDesiption());
			spsave = repository_SanPham.save(spsave);
			for (int i = 0; i < sp.getListimgsize(); i++) {
			    HinhAnh ha = new HinhAnh();
			    ha.setId(-1L);
			    ha.setCreate_at(new Date());
			    ha.setLink(BackEnd.RamdomNameImage());
			    ha.setSanpham_id(spsave.getId());
			    spsave.getListhinhanh().add(ha);
			}
			spsave = repository_SanPham.save(spsave);
			response.put(info_sanpham, spsave);
			response.put(info_message, insert_sanpham_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.clear();
			response.put(info_message, insert_sanpham_error);
		}
		return ResponseEntity.badRequest().body(response);
	}
	

}
