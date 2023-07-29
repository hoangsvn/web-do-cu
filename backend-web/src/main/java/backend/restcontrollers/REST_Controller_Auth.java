package backend.restcontrollers;

import java.util.HashSet;
import java.util.List;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import backend.modal.ERole;
import backend.modal.Role;
import backend.modal.User;
import backend.payload.request.Request_Login;
import backend.payload.request.Request_Signup;
import backend.payload.response.Response_JWT;
import backend.payload.response.Response_Message;
import backend.repository.Repository_Role;
import backend.repository.Repository_User;
import backend.security.jwt.JWT_Manager;
import backend.security.jwt.JWT_Utils;

import backend.security.services.UserDetailsImpl;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class REST_Controller_Auth extends REST_Compoment{
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private Repository_User userRepository;

	@Autowired
	private Repository_Role roleRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JWT_Utils jwtUtils;
	
	@Autowired
    private JWT_Manager jwt_Manager;
	 
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody Request_Login loginRequest) {
		Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
		return ResponseEntity.ok(new Response_JWT(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getFullname(), userDetails.getEmail(), roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody Request_Signup signUpRequest) {
		try {
			if (userRepository.existsByUsername(signUpRequest.getUsername())) {
				return ResponseEntity.badRequest().body(username_already);
			}
			if (userRepository.existsByEmail(signUpRequest.getEmail())) {
				return ResponseEntity.badRequest().body(email_already);
			}

			User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),encoder.encode(signUpRequest.getPassword()));
			user.setFullname(signUpRequest.getFullname());
			Set<Role> roles = new HashSet<>();
			Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
			user.setRoles(roles);
			userRepository.save(user);
			return ResponseEntity.ok(register_success);
		} catch (Exception e) {
			return ResponseEntity.ok(register_error);
		}
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

		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),encoder.encode(signUpRequest.getPassword()));

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
		User user = new User("admin", "admin@gmail.com", "$2a$12$YgyJGX9mIW3BK2cGarHWouFTB6dgCtl6Gd89pfVZehDIc3aVw8k5G");
		Set<Role> roles = new HashSet<>();
		Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN) .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(adminRole);
		Role userRole = roleRepository.findByName(ERole.ROLE_USER) .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);
		user.setRoles(roles);
		userRepository.save(user);
		return ResponseEntity.ok(new Response_Message("User Create successfully!","Create Admin",true));
	}

	@GetMapping("/info")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> InFo(HttpServletRequest request) {
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			String headerAuth = request.getHeader("Authorization");
			List<String> roles = userDetails.getAuthorities()
					.stream()
					.map(item -> item.getAuthority()) 
					.collect(Collectors.toList());
			if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
				return ResponseEntity .ok(
						new Response_JWT(userDetails.getId(), userDetails.getUsername(), userDetails.getFullname(),
										userDetails.getEmail(), headerAuth.substring(7, headerAuth.length()),roles));
			} else {
				return ResponseEntity.ok(
						new Response_JWT(userDetails.getId(), userDetails.getUsername(), userDetails.getFullname(),
									userDetails.getEmail()));
			}

		} 
		catch (ClassCastException e) {
			return ResponseEntity.ok(not_login);
		}
		catch (Exception e) {
			return ResponseEntity.ok(user_not_found);
		}
	}
	@GetMapping("/myrepository")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> InFoID(  ) {
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			User us = userRepository.findById(userDetails.getId()).get();
			us.setPassword("");  return ResponseEntity.ok(us);
 
		}
		catch (ClassCastException e) {
			return ResponseEntity.ok(not_login);
		}
		catch (Exception e) {
			return ResponseEntity.ok(user_not_found);
		}
	}
	@GetMapping("/logout")
	public ResponseEntity<?> Logout( HttpServletRequest request ) {
		try {
			 
			String headerAuth = request.getHeader("Authorization");
			return ResponseEntity.ok(headerAuth.substring(7, headerAuth.length()) );
 
		} catch (Exception e) {
			return ResponseEntity.ok(login_fail);
		}
	}
	@GetMapping("/running")
	public ResponseEntity<?> Count(  ) {
		try {
			
			  return ResponseEntity.ok("Running User =>" + jwt_Manager.getActiveJwtCount());
 
		} catch (Exception e) {
			return ResponseEntity.ok(login_fail);
		}
	}
	@GetMapping("/id")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> ID(  ) {
		try {
			UserDetailsImpl userDetails = getUserDetailsImplInAuthentcation();
			return ResponseEntity.ok(userDetails.getId());
		}
		catch(ClassCastException e) {
			return ResponseEntity.ok(not_login);
		}
		catch (Exception e) {
			return ResponseEntity.ok("Fail");
		}
		 
	}

}
