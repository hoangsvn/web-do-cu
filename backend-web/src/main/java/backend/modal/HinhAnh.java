package backend.modal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hinhanh")
public class HinhAnh {

	@Id
	@GeneratedValue
	private Long id;
	private Long sanpham_id;
	private String link;
	private String create_at;
	private String base64;
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
	public String getCreate_at() {
		return create_at;
	}
	public void setCreate_at(String create_at) {
		this.create_at = create_at;
	}
	public String getBase64() {
		return base64;
	}
	public void setBase64(String base64) {
		this.base64 = base64;
	}
	
}
