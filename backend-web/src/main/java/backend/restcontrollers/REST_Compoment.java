package backend.restcontrollers;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import backend.payload.response.Response_Message;
import backend.security.services.UserDetailsImpl;
 
public class REST_Compoment {
	
	public static Response_Message rest_controller_fail 	= new Response_Message("REST Controller Fail !", 		"Controller Fail"		, false);
	public static Response_Message rest_controller_success	= new Response_Message("REST Controller Succeess !",	"Controller Success"	, true);
	public static Response_Message rest_controller_error 	= new Response_Message("REST Controller Error !", 		"Controller Error"		, false);
	
	public static Response_Message not_login 				= new Response_Message("You Not Login !", 			"Not Login"		, false);
	public static Response_Message user_not_found			= new Response_Message("User Not Found !", 			"User Not Found", false);
	
	public static Response_Message login_fail 				= new Response_Message("You Login Fail!", 			"Login Fail"	, false);
	public static Response_Message login_eror 				= new Response_Message("You Login Error !", 		"Login Eror"	, false);
	public static Response_Message login_success 			= new Response_Message("You Login Success!", 		"Login Success"	, true);
	
	public static Response_Message logout_fail 				= new Response_Message("You Logout Fail!", 			"Logout Fail"	, false);
	public static Response_Message logout_eror 				= new Response_Message("You Logout Error !", 		"Logout Eror"	, false);
	public static Response_Message logout_success 			= new Response_Message("You Logout Success!", 		"Logout Success", true);	
	
	public static Response_Message username_already			= new Response_Message("Username is already taken !",	"In MySql"	, false);
	public static Response_Message email_already 			= new Response_Message("Email is already taken !", 		"In MySql"	, false);
	
	public static Response_Message register_fail 			= new Response_Message("User registered Fail !", 	"Registered"	, false);
	public static Response_Message register_error 			= new Response_Message("User registered Error !", 	"Registered"	, false);
	public static Response_Message register_success 		= new Response_Message("User registered Success !", "Registered"	, true);
	
	public static Response_Message add_cart_fail 			= new Response_Message("Add Fail !", 				"Add to Cart"	, false);
	public static Response_Message add_cart_success 		= new Response_Message("Add Success !", 			"Add to Cart"	, true);;
	public static Response_Message add_cart_error 			= new Response_Message("Add Error !", 				"Add to Cart"	, false);;

	public static Response_Message sanpham_already_in_cart	= new Response_Message("Sanpham is already in Cart","In Cart"		, false);
	public static Response_Message sanpham_is_number 		= new Response_Message("SanPham ID Is Number", 	 	"SanPham ID"	, false);
	
	public static Response_Message sanpham_isnot_exists_in_mysql 	= new Response_Message("SanPham Is Not Exists In Mysql", 	"SanPham In Mysql"	, false);
	public static Response_Message sanpham_is_exists_in_mysql 		= new Response_Message("SanPham Is Exists In Mysql", 		"SanPham In Mysql"	, false);
	public static Response_Message sanpham_isnot_exists_in_cart 	= new Response_Message("SanPham Is Not Exists in Cart", 	"SanPham in Cart"	, false);
	
	public static Response_Message delete_sanpham_in_cart_success 	= new Response_Message("Delete SanPham in Cart Success!", 	"Delete in Cart"	, true);
	public static Response_Message delete_sanpham_in_cart_fail 		= new Response_Message("Delete SanPham in Cart Fail!", 		"Delete in Cart"	, false);
	public static Response_Message delete_sanpham_in_cart_error 	= new Response_Message("Delete SanPham in Cart Error!", 	"Delete in Cart"	, false);

	public static Response_Message delete_sanpham_success 	= new Response_Message("Delete SanPham Success!", 	"Delete in Mysql"	, true);
	public static Response_Message delete_sanpham_fail 		= new Response_Message("Delete SanPham Fail!", 		"Delete in Mysql"	, false);
	public static Response_Message delete_sanpham_error 	= new Response_Message("Delete SanPham Error!", 	"Delete in Mysql"	, false);

	public static Response_Message update_sanpham_success 	= new Response_Message("Update SanPham Success!", 	"Update in Mysql"	, true);
	public static Response_Message update_sanpham_fail 		= new Response_Message("Update SanPham Fail!", 		"Update in Mysql"	, false);
	public static Response_Message update_sanpham_error 	= new Response_Message("Update SanPham Error!", 	"Update in Mysql"	, false);

	public static Response_Message insert_sanpham_success 	= new Response_Message("Insert SanPham Success!", 	"Insert in Mysql"	, true);
	public static Response_Message insert_sanpham_fail 		= new Response_Message("Insert SanPham Fail!", 		"Insert in Mysql"	, false);
	public static Response_Message insert_sanpham_error 	= new Response_Message("Insert SanPham Error!", 	"Insert in Mysql"	, false);

	public static Response_Message image_not_found 			= new Response_Message("Image not Found", 			"Image In MySql"	, false); 
	public static Response_Message image_fail 				= new Response_Message("Image Fail", 				"Image In MySql"	, false);
	public static Response_Message image_success 			= new Response_Message("Image Success", 			"Image In MySql"	, true);
	public static Response_Message image_error				= new Response_Message("Image Error", 				"Image In MySql"	, false);
	
	public static String type_success 		= "success";
	public static String type_error 		= "error";
	public static String type_fail 			= "fail";
	
	public static String info_message 	= "message";
	public static String info_sanpham 	= "sanpham";
	public static String info_address 	= "address";
	public static String info_user 		= "userinfo";
	public static String info_image 	= "image";
	
	public static Response_Message upload_image_success 	= new Response_Message("Upload Image Success !", 	"Insert in Mysql"	, true);
	public static Response_Message upload_image_fail 		= new Response_Message("Upload Image Fail !", 		"Insert in Mysql"	, false);
	public static Response_Message upload_image_error 		= new Response_Message("Upload Image Error !", 		"Insert in Mysql"	, false);
	
	public UserDetailsImpl getUserDetailsImplInAuthentcation(Authentication authentication) {
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		return userPrincipal;
	}
	public UserDetailsImpl getUserDetailsImplInAuthentcation() {
		Authentication authentications = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentications.getPrincipal();
		return userPrincipal;
	} 
}
