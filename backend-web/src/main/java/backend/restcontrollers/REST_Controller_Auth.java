package backend.restcontrollers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.modal.Cart;
import backend.modal.ERole;
import backend.modal.Role;
import backend.modal.SanPham;
import backend.modal.User;
import backend.modal.UserInFo;
import backend.payload.request.Request_Login;
import backend.payload.request.Request_Signup;
import backend.payload.request.Request_UserInfo;
import backend.payload.response.Response_JWT;
import backend.payload.response.Response_Message;
import backend.repository.Repository_Role;
import backend.repository.Repository_SanPham;
import backend.repository.Repository_User;
import backend.repository.Repository_UserInFo;
import backend.security.jwt.JWT_Manager;
import backend.security.jwt.JWT_Utils;

import backend.security.services.UserDetailsImpl;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class REST_Controller_Auth extends REST_Compoment {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private Repository_User userRepository;

	@Autowired
	private Repository_UserInFo repository_UserInFo;

	@Autowired
	private Repository_Role roleRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JWT_Utils jwtUtils;

	@Autowired
	private Repository_SanPham repository_SanPham;

	@Autowired
	private JWT_Manager jwt_Manager;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody Request_Login loginRequest) {
		Map<String, Object> response = new HashMap<>();
		try {
			Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()) .collect(Collectors.toList());
			response.put(info_user, new Response_JWT(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getFullname(), userDetails.getEmail(), roles));
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			
			response.clear();
			response.put(info_message, rest_controller_error);
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody Request_Signup signUpRequest) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (userRepository.existsByUsername(signUpRequest.getUsername())) {
				response.put(info_message, username_already);
				return ResponseEntity.badRequest().body(response);
			}
			if (userRepository.existsByEmail(signUpRequest.getEmail())) {
				response.put(info_message, email_already);
				return ResponseEntity.badRequest().body(response);
			}

			User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
					encoder.encode(signUpRequest.getPassword()));

			Set<Role> roles = new HashSet<>();
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
			user.setRoles(roles);
			user = userRepository.save(user);
			user.setPassword("");
			response.put(info_user, user);
			response.put(info_message, register_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.clear();
			response.put(info_message, register_error);
		}
		return ResponseEntity.badRequest().body(response);
	}

	@PostMapping("/add")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> AddUser(@Valid @RequestBody Request_Signup signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(username_already);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(email_already);
		}

		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(register_success);
	}

	@PostMapping("/create")
	public ResponseEntity<?> CreateUser() {
		User user = new User("admin", "admin@gmail.com",
				"$2a$12$YgyJGX9mIW3BK2cGarHWouFTB6dgCtl6Gd89pfVZehDIc3aVw8k5G");
		Set<Role> roles = new HashSet<>();
		Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(adminRole);
		Role userRole = roleRepository.findByName(ERole.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);
		user.setRoles(roles);
		userRepository.save(user);
		return ResponseEntity.ok(new Response_Message("User Create successfully!", "Create Admin", true));
	}

	@PostMapping("/updateuserinfo")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> UpdateUserInfo(@Valid @RequestBody Request_UserInfo repu) {

		Map<String, Object> response = new HashMap<>();

		try {
			UserInFo user = new UserInFo();
			UserDetailsImpl userdetail = getUserDetailsImplInAuthentcation();
			try {
				user = repository_UserInFo.findByUserid(userdetail.getId()).get();
			} catch (Exception e) {
				user.setId(-1l);
				user.setUserid(userdetail.getId());
			}

			if (repu.getFullname() != null) {
				user.setFullname(repu.getFullname());
			}
			if (repu.getAddress() != null) {
				user.setAddress(repu.getAddress());
			}
			if (repu.getLinkfacebook() != null) {
				user.setLinkfacebook(repu.getLinkfacebook());
			}
			if (repu.getLinkinstagram() != null) {

				user.setLinkinstagram(repu.getLinkinstagram());
			}
			if (repu.getLinktwitter() != null) {
				user.setLinktwitter(repu.getLinktwitter());
			}
			if (repu.getPhonenumber() != null) {
				user.setPhonenumber(repu.getPhonenumber());
			}
			if (repu.getDatebirth() != null) {
				user.setDatebirth(repu.getDatebirth());
			}
		 
			user = repository_UserInFo.saveAndFlush(user);
			response.put(info_user, user);
			response.put(info_message, update_userinfo_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			 
			response.clear();
			response.put(info_message, update_userinfo_error);
		}
		return ResponseEntity.badRequest().body(response);
	}

	@GetMapping("/info")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> InFo(HttpServletRequest request) {
		Map<String, Object> response = new HashMap<>();
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			User us = userRepository.findById(userDetails.getId()).get();
			us.setPassword("");
			us.getCart().clear();
			us.getListsanphamid().clear();
			response.put(info_user, us);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);

		} catch (ClassCastException e) {
			response.clear();
			response.put(info_message, not_login);

		} catch (Exception e) {
			response.clear();
			response.put(info_message, user_not_found);
		}
		return ResponseEntity.badRequest().body(response);
	}

	@GetMapping("/myrepository/{path}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> MyrepositoryPath(@PathVariable String path) {
		Map<String, Object> response = new HashMap<>();
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			User us = userRepository.findById(userDetails.getId()).get();
			us.setPassword("");
			response.put(info_message, rest_controller_success);
			if (path.endsWith("listsanpham")) {
				response.put(info_sanpham, us.getListsanphamid());
			} else if (path.endsWith("listcart")) {
				List<SanPham> listcart = new ArrayList<>();
				for (Cart s : us.getCart()) {
					if (repository_SanPham.existsById(s.getSanpham_id())) {
						listcart.add(repository_SanPham.findById(s.getSanpham_id()).get());
					}
				}
				response.put(info_sanpham, listcart);
			} else if (path.endsWith("listdiachi")) {
				response.put(info_address, us.getListdiachi());
			} else {
				response.put(info_message, rest_controller_fail);
			}

			return ResponseEntity.ok(response);

		} catch (ClassCastException e) {
			response.clear();
			response.put(info_message, not_login);

		} catch (Exception e) {
			response.clear();
			response.put(info_message, user_not_found);
		}
		return ResponseEntity.badRequest().body(response);
	}

	// Kho chua cua ban

	@GetMapping("/myrepository")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> Myrepository() {
		Map<String, Object> response = new HashMap<>();
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			User us = userRepository.findById(userDetails.getId()).get();
			us.setPassword("");
			response.put(info_user, us);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);

		} catch (ClassCastException e) {
			response.clear();
			response.put(info_message, not_login);

		} catch (Exception e) {
			response.clear();
			response.put(info_message, user_not_found);
		}
		return ResponseEntity.badRequest().body(response);
	}

	@GetMapping("/logout")
	public ResponseEntity<?> Logout(HttpServletRequest request) {
		try {

			String headerAuth = request.getHeader("Authorization");
			return ResponseEntity.ok(headerAuth.substring(7, headerAuth.length()));

		} catch (Exception e) {
			return ResponseEntity.ok(login_fail);
		}
	}

	@GetMapping("/running")
	public ResponseEntity<?> Count() {
		try {

			return ResponseEntity.ok("Running User =>" + jwt_Manager.getActiveJwtCount());

		} catch (Exception e) {
			return ResponseEntity.ok(login_fail);
		}
	}

	@GetMapping("/id")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> ID() {
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			return ResponseEntity.ok(userDetails.getId());
		} catch (ClassCastException e) {
			return ResponseEntity.ok(not_login);
		} catch (Exception e) {
			return ResponseEntity.ok("Fail");
		}

	}

	// Thong tin cong khai cua 1 user
	@GetMapping("/publicinfo/id={id}")
	public ResponseEntity<?> PubLicUserInfo(@PathVariable String id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Long sid = Long.parseLong(id);
			User us = userRepository.findById(sid).get();
			us.setPassword("");
			us.setUsername("");
			us.getListsanphamid().clear();
			us.getCart().clear();
			us.getRoles().clear();
			response.put(info_user, us);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);

		} catch (ClassCastException e) {
			response.clear();
			response.put(info_message, not_login);

		} catch (Exception e) {
			response.clear();
			response.put(info_message, user_not_found);
		}
		return ResponseEntity.badRequest().body(response);
	}

	// ADMIN lây thông tin tất cả user
	@GetMapping("/all")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAll() {
		Map<String, Object> response = new HashMap<>();
		try {

			List<User> listus = userRepository.findAll();
			for (User user : listus) {
				user.getListdiachi().clear();
				user.getListsanphamid().clear();
				user.getCart().clear();
				user.getListdiachi().clear();
				user.setPassword("");
				user.setUserinfo(null);
			}
			response.put(info_user, listus);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.clear();
			response.put(info_message, rest_controller_error);
		}
		return ResponseEntity.badRequest().body(response);

	}

	@GetMapping("/search={search}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> PubLicSearch(@PathVariable String search) {
		Map<String, Object> response = new HashMap<>();
		try {

			List<User> listus = userRepository.searchByNameLike(search);
			for (User user : listus) {
				user.getListdiachi().clear();
				user.getListsanphamid().clear();
				user.getCart().clear();
				user.getListdiachi().clear();
				user.setPassword("");
				user.setUserinfo(null);
			}
			response.put(info_user, listus);
			response.put(info_message, rest_controller_success);
			return ResponseEntity.ok(response);

		} catch (ClassCastException e) {
			response.clear();
			response.put(info_message, not_login);

		} catch (Exception e) {
			response.clear();
			response.put(info_message, user_not_found);
		}
		return ResponseEntity.badRequest().body(response);
	}

}
