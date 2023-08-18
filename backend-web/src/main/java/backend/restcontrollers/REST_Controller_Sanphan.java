package backend.restcontrollers;

import java.util.ArrayList;
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
import backend.modal.DanhMuc;
import backend.modal.HinhAnh;
import backend.modal.Notification;
import backend.modal.SanPham;
import backend.modal.UserInFo;
import backend.payload.request.Resquest_sanpham;
import backend.repository.Repository_DanhMuc;
import backend.repository.Repository_HinhAnh;
import backend.repository.Repository_Notification;
import backend.repository.Repository_SanPham;
import backend.repository.Repository_UserInFo;
import backend.security.services.UserDetailsImpl;
 

@CrossOrigin
@RestController
@RequestMapping("/api/sanpham")
public class REST_Controller_Sanphan extends REST_Compoment {

	@Autowired
	private Repository_SanPham repository_SanPham;
	
	@Autowired
	private Repository_HinhAnh repository_HinhAnh;
	
	@Autowired
	private Repository_DanhMuc repository_DanhMuc;

	@Autowired
	private Repository_Notification repository_Notification;
	
	@Autowired
	private Repository_UserInFo repository_UserInFo;
	
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
		return ResponseEntity.badRequest().body(response);
		
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
	public ResponseEntity<?> UpdateByID(@Valid @RequestBody Resquest_sanpham sp) {
		Map<String, Object> response = new HashMap<>();
		try {
			UserDetailsImpl userDetail = getUserDetailsImplInAuthentcation();
			SanPham spsave = new SanPham();
			spsave = repository_SanPham.findById(sp.getId()).get();
			spsave.setId(sp.getId());
			spsave.setName(sp.getName());
			spsave.setCreate_at(new Date());
			spsave.setUser_id(userDetail.getId());
			spsave.setPrice(sp.getPrice());
			spsave.setDesiption(sp.getDesiption());
			try {
				if (sp.getDanhmucid()!=0 || sp.getDanhmucid() != spsave.getListdanhmuc().get(0).getId()) {
					DanhMuc ms = repository_DanhMuc.findById(sp.getDanhmucid()).get();
					spsave.getListdanhmuc().clear();
					spsave.getListdanhmuc().add(ms);	 
				}
				 
			} catch (Exception e) {
				 
			}
			spsave = repository_SanPham.save(spsave);
			try {
				for (HinhAnh a : spsave.getListhinhanh()) {
				    repository_HinhAnh.deleteById(a.getId());
				}
				spsave.getListhinhanh().clear();
				List<HinhAnh> newImages = new ArrayList<>();
				for (int i = 0; i < sp.getListimgsize(); i++) {
				    HinhAnh ha = new HinhAnh();
				    ha.setId(-1L);
				    ha.setCreate_at(new Date());
				    ha.setLink(BackEnd.RamdomNameImage());
				    ha.setSanpham_id(spsave.getId());
				    newImages.add(ha);
				}
				spsave.getListhinhanh().addAll(newImages);

			} catch (Exception e) {
				 System.out.println("Error Update");
			}
			spsave = repository_SanPham.saveAndFlush(spsave);
			response.put(info_sanpham, spsave);
			response.put(info_message, update_sanpham_success);
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
			spsave.setState(true);
			try {
				if (sp.getDanhmucid()!=0) {
					DanhMuc ms = repository_DanhMuc.findById(sp.getDanhmucid()).get();
					spsave.getListdanhmuc().clear();
					spsave.getListdanhmuc().add(ms);
				}
			} catch (Exception e) {
				
			}
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
			 
			response.clear();
			response.put(info_message, insert_sanpham_error);
		}
		return ResponseEntity.badRequest().body(response);
	}
	
	
	
	
	
	
	@PostMapping("/tupdate")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> TUpdateByID(@Valid @RequestBody SanPham sp) {
		Map<String, Object> response = new HashMap<>();
		try {
			repository_SanPham.save(sp);
 
			response.put(info_sanpham, sp);
			response.put(info_message, update_sanpham_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.clear();
			response.put(info_message, update_sanpham_error);
		}
		return ResponseEntity.badRequest().body(response);
		
	}
	
	
	@GetMapping("/search={search}")
	public ResponseEntity<?> Search(@PathVariable String search) {
		Map<String, Object> response = new HashMap<>();
		try {
			 
			List<SanPham> listsp = repository_SanPham.searchByAllLike(search);
			response.put(info_sanpham, listsp);
			response.put(info_message, search_sanpham_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.clear();
			response.put(info_message, search_sanpham_error);
		}
		return ResponseEntity.badRequest().body(response);
		
	}
	@GetMapping("/all")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAll() {
		Map<String, Object> response = new HashMap<>();
		try {
			 
			List<SanPham> listsp = repository_SanPham.findAll();
			response.put(info_sanpham, listsp);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.clear();
			response.put(info_message, rest_controller_error);
		}
		return ResponseEntity.badRequest().body(response);
		
	}
	@GetMapping("/buy/id={id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> BuyID( @PathVariable String id) {
		Map<String, Object> response = new HashMap<>();
		try {
			
			Long sid = Long.parseLong(id);
			SanPham sp = repository_SanPham.findById(sid).get();
			Long buyuserid 		=getUserDetailsImplInAuthentcation().getId();
			Long owneruserid 	=sp.getUser_id();
			UserInFo ownerinfo = repository_UserInFo.findByUserid(sp.getUser_id()).get();
			UserInFo buyinfo = repository_UserInFo.findByUserid(buyuserid).get();
			if (sp.getState() && buyuserid != owneruserid) {
				
				Date date = new Date();
				
				Notification user_buy_noti = new Notification();
				user_buy_noti.setId(-1l);
				user_buy_noti.setUserid(buyuserid);
				user_buy_noti.setTitle("You have ordered a product named :" + sp.getName());
				user_buy_noti.setCreate_at(date);
				
				StringBuilder buystring  = new StringBuilder();
				buystring.append("You have ordered a product named :" + sp.getName() +"\n");
				buystring.append("With the price :" + sp.getPrice() +"\n");
				buystring.append("From the owner :" + ownerinfo.getFullname() +"\n");
				buystring.append("Contact phone number :" + ownerinfo.getPhonenumber() +"\n");
				user_buy_noti.setBody(buystring.toString());
 
				Notification owner_noti = new Notification();
				owner_noti.setId(-1l);
				owner_noti.setUserid(owneruserid);
				owner_noti.setTitle("Someone ordered your product named :" + sp.getName());
				owner_noti.setCreate_at(date);
				
				StringBuilder owner_notification  = new StringBuilder();
				owner_notification.append("Someone ordered your product named :" + sp.getName() +"\n");
				owner_notification.append("With the price :" + sp.getPrice() +"\n");
				owner_notification.append("Product buyer information Fullname :" + buyinfo.getFullname() +"\n");
				owner_notification.append("Contact phone number :" + buyinfo.getPhonenumber() +"\n");
				owner_notification.append("Contact Address :" + buyinfo.getAddress() +"\n");
				owner_noti.setBody(owner_notification.toString());
				
				sp.setState(false);
				repository_Notification.save( user_buy_noti);
				repository_Notification.save( owner_noti);
				sp = repository_SanPham.save(sp);
				response.put(info_sanpham, sp);
				response.put(info_message, buy_sanpham_success);
				
			} else {
				response.put(info_message, buy_sanpham_fail);
			}
			 
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.clear();
			response.put(info_message, buy_sanpham_error);
		}
		return ResponseEntity.badRequest().body(response);
		
	}
}
