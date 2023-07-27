package backend.security.jwt;

import java.util.Date;

public class JWT_InFo {
	private String token;
	private Date expirationDate;

	public Date getExpirationDate() {
		return expirationDate;
	}

	public JWT_InFo(String jwt ,Date expirationdate ) {
		this.token = jwt;
		this.expirationDate =expirationdate;
	}
	public JWT_InFo() {
		 
	}
	public String getToken() {
		return token;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public void setToken(String token) {
		this.token = token;
	}
}
