package backend.restcontrollers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import backend.modal.Cart;
import backend.repository.Repository_Cart;
import backend.repository.Repository_SanPham;
import backend.security.jwt.JWT_Utils;
import backend.security.services.UserDetailsImpl;

@RestController
@CrossOrigin
@RequestMapping("/api/cart")
public class REST_Controller_Cart extends Response {
	
	
	@Autowired
	private Repository_SanPham repository_SanPham;
	
	@Autowired
	private Repository_Cart repository_Cart;
	
	@Autowired
	private JWT_Utils jwtUtils;
	
	
	@GetMapping("addtocart/id={sanpham_id}")
	public ResponseEntity<?> AddToCard(@PathVariable Long sanpham_id) {
		Map<String, Object> response = new HashMap<>();
		try {
			
			if (repository_SanPham.existsById(sanpham_id)) {
				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				UserDetailsImpl userDetails = jwtUtils.getUserDetailsImpl(authentication);
				List<Cart> lcart = repository_Cart.findByUserIdAndSanphamId(userDetails.getId(), sanpham_id);
				Cart cart = new Cart();
				cart.setSanpham_id(sanpham_id);
				cart.setUser_id(userDetails.getId());
				
				if (lcart.size()>1) {
					cart.setCount(1L);
					for(Cart c : lcart) {
						repository_Cart.delete(c);
					}
					repository_Cart.save(cart);
					response.put("message", add_cart_success);
				} else if (lcart.size()==0) {
					cart.setCount(1L);
					cart.setId(-1L);
					repository_Cart.save(cart);
					response.put("message", add_cart_success);
				}else if (lcart.size()==1) {
					response.put("message", sanpham_already_in_cart);
				} 
				
				
			} else {
				 
				response.put("message", add_cart_fail);
			}
			
			return ResponseEntity.ok(response);
		}
		catch (ClassCastException e) {
			return ResponseEntity.ok(not_login);
		}
		catch (Exception e) {
			response.clear();
			response.put("message", add_cart_error);
			return ResponseEntity.status(404).body(response);
		}
	}
	
	
	
	@GetMapping("deletetocart/id={sanpham_id}")
	public ResponseEntity<?> DeleteToCard(@PathVariable Long sanpham_id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetailsImpl userDetails = jwtUtils.getUserDetailsImpl(authentication);
			List<Cart> lcart = repository_Cart.findByUserIdAndSanphamId(userDetails.getId(), sanpham_id);
			
			if (lcart.size()>=1) {
				for(Cart c : lcart) {
					repository_Cart.delete(c);
				}
				response.put("message", delete_sanpham_in_cart_success);
			} else if (lcart.size()==0) {
				response.put("message", sanpham_already_in_cart);
			}
			return ResponseEntity.ok(response);
		} 
		catch (ClassCastException e) {
			response.clear();
			response.put("message", not_login);
			return ResponseEntity.status(404).body(response);	
		}
		catch (Exception e) {
			response.clear();
			response.put("message", delete_sanpham_in_cart_error);
			return ResponseEntity.status(404).body(response);
		}
	}
}
