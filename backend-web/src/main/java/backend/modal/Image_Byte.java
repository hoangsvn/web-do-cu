package backend.modal;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "imagebyte" ,uniqueConstraints = {@UniqueConstraint(columnNames = "link")})
public class Image_Byte {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String link;
	
	private byte[] imagebyte;
	
	
	private Date create_at;
	
	public Date getCreate_at() {
		return create_at;
	}
	public void setCreate_at(Date create_at) {
		this.create_at = create_at;
	}
	
	public Long getId() {
		return id;
	}
	public byte[] getImagebyte() {
		return imagebyte;
	}
	public String getLink() {
		return link;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setImagebyte(byte[] imagebyte) {
		this.imagebyte = imagebyte;
	}
	public void setLink(String link) {
		this.link = link;
	}
}
