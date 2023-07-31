package backend.modal;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

 
@Entity
@Table(name = "sanpham")
public class SanPham {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id;
	
	@NotNull
	private Long user_id;
	private Long price;
	private String name;
	
	private Date create_at;
	private String desiption;

	@OneToMany(fetch = FetchType.LAZY, targetEntity = HinhAnh.class ,cascade = CascadeType.ALL ,mappedBy = "sanpham_id")
	private List<HinhAnh> listhinhanh =new ArrayList<>();
	
	@ManyToMany(targetEntity = DanhMuc.class , cascade =CascadeType.DETACH )
	@JoinTable(name = "sanpham_danhmuc")
	private List<DanhMuc> listdanhmuc =new ArrayList<>();
	
	
	public List<DanhMuc> getListdanhmuc() {
		return listdanhmuc;
	}
	public void setListdanhmuc(List<DanhMuc> listdanhmuc) {
		this.listdanhmuc = listdanhmuc;
	}
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
	public List<HinhAnh> getListhinhanh() {
		return listhinhanh;
	}
	public void setListhinhanh(List<HinhAnh> listhinhanh) {
		this.listhinhanh = listhinhanh;
	}
	@Override
	public String toString() {
		return "SanPham [id=" + id + ", user_id=" + user_id + ", price=" + price + ", name=" + name + ", create_at="
				+ create_at + ", desiption=" + desiption + ", listhinhanh=" + listhinhanh + "]";
	}
	
	
}


