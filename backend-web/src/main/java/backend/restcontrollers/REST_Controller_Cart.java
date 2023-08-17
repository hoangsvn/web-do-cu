package backend.restcontrollers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import backend.modal.Cart;
import backend.modal.SanPham;
import backend.repository.Repository_Cart;
import backend.repository.Repository_SanPham;
import backend.security.services.UserDetailsImpl;

@RestController
@CrossOrigin
@RequestMapping("/api/cart")
public class REST_Controller_Cart extends REST_Compoment {
	
	
	@Autowired
	private Repository_SanPham repository_SanPham;
	
	@Autowired
	private Repository_Cart repository_Cart;
	
	 
	
	
	@GetMapping("/addtocart/id={sp_id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> AddToCard(@PathVariable String sp_id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Long sanpham_id = Long.parseLong(sp_id);
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			
			if (repository_SanPham.existsById(sanpham_id)) {
				List<Cart> lcart = repository_Cart.findByUserIdAndSanphamId(userDetails.getId(), sanpham_id);
				Cart cart = new Cart();
				cart.setSanpham_id(sanpham_id);
				cart.setUser_id(userDetails.getId());
				SanPham sp = repository_SanPham.findById(sanpham_id).get();
				if (sp.getUser_id() == userDetails.getId()) {
					response.put(info_message, you_owner_sanpham);
				} else if ( !sp.getState()) {
					response.put(info_message, sanpham_order_by_someone);
				} else if (lcart.size()>1) {
					cart.setCount(1L);
					for(Cart c : lcart) {
						repository_Cart.delete(c);
					}
					repository_Cart.save(cart);
					response.put(info_message, add_cart_success);
				} else if (lcart.size()==0) {
					cart.setCount(1L);
					cart.setId(-1L);
					repository_Cart.save(cart);
					response.put(info_message, add_cart_success);
				} else if (lcart.size()==1) {
					response.put(info_message, sanpham_already_in_cart);
				} 
			} else {
				response.put(info_message, sanpham_isnot_exists_in_mysql);
			}
			
			return ResponseEntity.ok(response);
		}
		catch (ClassCastException e) {
			return ResponseEntity.ok(not_login);
		}
		catch (Exception e) {
			response.clear();
			response.put(info_message, add_cart_error);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	
	
	@GetMapping("/deletetocart/id={sanpham_id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> DeleteToCard(@PathVariable Long sanpham_id) {
		Map<String, Object> response = new HashMap<>();
		try {
			
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			List<Cart> lcart = repository_Cart.findByUserIdAndSanphamId(userDetails.getId(), sanpham_id);
			
			if (lcart.size()>=1) {
				for(Cart c : lcart) {
					repository_Cart.delete(c);
				}
				response.put(info_message, delete_sanpham_in_cart_success);
			} else if (lcart.size()==0) {
				response.put(info_message, sanpham_isnot_exists_in_cart);
			}
			return ResponseEntity.ok(response);
		} 
		catch (ClassCastException e) {
			response.clear();
			response.put(info_message, not_login);
		}
		catch (Exception e) {
			response.clear();
			response.put(info_message, delete_sanpham_in_cart_error);
		}
		return ResponseEntity.badRequest().body(response);	
	}
}
