package backend.modal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "diachi")
public class DiaChi {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long user_id;
	private String Tinh;
	private String Huyen;
	private String Xa;
	private String Thon;
	private String ghichu;
	
	public Long getUser_id() {
		return user_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTinh() {
		return Tinh;
	}
	public void setTinh(String tinh) {
		Tinh = tinh;
	}
	public String getHuyen() {
		return Huyen;
	}
	public void setHuyen(String huyen) {
		Huyen = huyen;
	}
	public String getXa() {
		return Xa;
	}
	public void setXa(String xa) {
		Xa = xa;
	}
	public String getThon() {
		return Thon;
	}
	public void setThon(String thon) {
		Thon = thon;
	}
	public String getGhichu() {
		return ghichu;
	}
	public void setGhichu(String ghichu) {
		this.ghichu = ghichu;
	}
	
	
	
}
