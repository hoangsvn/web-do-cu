package backend.modal;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
 
@Entity
@Table(name = "sanphan")
public class SanPham {
	
	@Id
	@GeneratedValue
	private Long id;
	private Long user_id;
	private Long price;
	private String name;
	private Date create_at;
	private String desiption;

	@OneToMany(mappedBy = "hinhanh")
	private List<HinhAnh> listhinhanh =new ArrayList<>();
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUser_id() {
		return user_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public Long getPrice() {
		return price;
	}
	public void setPrice(Long price) {
		this.price = price;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreate_at() {
		return create_at;
	}
	public void setCreate_at(Date create_at) {
		this.create_at = create_at;
	}
	public String getDesiption() {
		return desiption;
	}
	public void setDesiption(String desiption) {
		this.desiption = desiption;
	}
	
}


