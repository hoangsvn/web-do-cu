package backend.modal;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hinhanh")
public class HinhAnh {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long sanpham_id;
	private String link;
	
	private Date create_at;
	
	 
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getSanpham_id() {
		return sanpham_id;
	}
	public void setSanpham_id(Long sanpham_id) {
		this.sanpham_id = sanpham_id;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public Date getCreate_at() {
		return create_at;
	}
	public void setCreate_at(Date create_at) {
		this.create_at = create_at;
	}
	 
	@Override
	public String toString() {
		return "HinhAnh [id=" + id + ", sanpham_id=" + sanpham_id + ", link=" + link + ", create_at=" + create_at+ "]";
	}
	
}
