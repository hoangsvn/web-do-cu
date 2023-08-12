package backend.modal;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;


@Entity
@Table(name = "userinfo" ,uniqueConstraints = {@UniqueConstraint(columnNames = "userid")})
public class UserInFo {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long userid;
	
	@Size(max = 200)
	private String fullname;
	@Size(max = 20)
	private String phonenumber;
	@Size(max = 200)
	private String linkfacebook;
	@Size(max = 200)
	private String linkintagram;
	@Size(max = 200)
	private String linktwitter;
	@Size(max = 200)
	private String address;
	private Date datebirth;
	

    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
		this.userid = userid;
	}
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
	public String getLinkintagram() {
		return linkintagram;
	}
	public void setLinkintagram(String linkintagram) {
		this.linkintagram = linkintagram;
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
