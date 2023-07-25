package backend.modal;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "danhmuc")
public class DanhMuc {
	private Long id;
	private String name;
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
}
