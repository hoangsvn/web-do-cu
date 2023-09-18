package backend.payload.response;

import java.util.List;

public class Response_JWT {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
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
