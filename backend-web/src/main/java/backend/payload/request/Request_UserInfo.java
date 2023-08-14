package backend.payload.request;

import java.util.Date;

 

public class Request_UserInfo {

	private String fullname;
 
	private String phonenumber;
 
	private String linkfacebook;
 
	private String linkinstagram;
 
	private String linktwitter;
 
	private String address;
	
	private Date datebirth;

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public String getLinkfacebook() {
		return linkfacebook;
	}

	public void setLinkfacebook(String linkfacebook) {
		this.linkfacebook = linkfacebook;
	}

	public String getLinkinstagram() {
		return linkinstagram;
	}

	public void setLinkinstagram(String linkinstagram) {
		this.linkinstagram = linkinstagram;
	}

	public String getLinktwitter() {
		return linktwitter;
	}

	public void setLinktwitter(String linktwitter) {
		this.linktwitter = linktwitter;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDatebirth() {
		return datebirth;
	}

	public void setDatebirth(Date datebirth) {
		this.datebirth = datebirth;
	}
	
	
}
