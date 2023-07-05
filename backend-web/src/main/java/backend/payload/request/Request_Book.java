package backend.payload.request;

import java.util.Set;

import javax.validation.constraints.NotBlank;

public class Request_Book {
	 
	private Long id;
	
	@NotBlank
	private String author;

	private Set<Long> categorys;
	
	private Long count;
	
	private String image;
	
	private String link;
	
	@NotBlank
	private String name;

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Set<Long> getCategorys() {
		return categorys;
	}
	public void setCategorys(Set<Long> categorys) {
		this.categorys = categorys;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
}
