package backend.models;

import java.util.Date;

import javax.persistence.*;
 
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

 

@Entity
@Table(name = "Chapter")
public class Chapter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String name;
	
	 
	
	private Long bookid;
	
	private Date create_at;
	
	@Column(columnDefinition="TEXT")
	private String content;
	
	public String getContent() {
		return content;
	}
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
	public void setContent(String content) {
		this.content = content;
	}
	public Long getBookid() {
		return bookid;
	}
	public void setBookid(Long bookid) {
		this.bookid = bookid;
	}
	public Date getCreate_at() {
		return create_at;
	}
	public void setCreate_at(Date create_at) {
		this.create_at = create_at;
	}
	 
	public Chapter() {
		 
	}
	public Chapter(Long id,String  name ,Date create) {
		this.id = id;
		this.name = name;
		this.create_at = create;
	}
	public Chapter(Long id,Long bid,String name ,Date create) {
		this.id = id;
		this.name = name;
		this.bookid = bid;
		this.create_at = create;
	}
 
}
