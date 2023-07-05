package backend.payload.response;

import java.util.List;

public class Response_JWT {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private String fullname;
	private List<String> roles;

	public Response_JWT(String tk, Long id, String username, String email, List<String> roles) {
		this.token = tk;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}
	public Response_JWT( Long id, String username, String email, List<String> roles) {
		 
		this.id = id;
		this.username = username;
		this.email = email;
		 
	}
	public Response_JWT( Long id, String username, String name,String email) {
		 
		this.id = id;
		this.username = username;
		this.email = email;
		this.fullname = name;
	}
	public Response_JWT( Long id, String username, String name,String email,String jwt) {
		 
		this.id = id;
		this.username = username;
		this.email = email;
		this.fullname = name;
		this.token = jwt;
	}
	public Response_JWT( Long id, String username, String name,String email,String jwt,List<String> roles) {
		 
		this.id = id;
		this.username = username;
		this.email = email;
		this.fullname = name;
		this.token = jwt;
		this.roles = roles;
	}
	public Response_JWT(String tk, Long id, String username,String fullname, String email, List<String> roles) {
		this.token = tk;
		this.id = id;
		this.username = username;
		this.fullname = fullname;
		this.email = email;
		this.roles = roles;
	}
	
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getToken() {
		return token;
	}

	public void setToken(String tk) {
		this.token = tk;
	}

	public String getType() {
		return type;
	}

	public void setType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}


	 


	 
	
}
