package backend.models;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "books",uniqueConstraints = { @UniqueConstraint(columnNames = "link") })
public class Books {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	 
	@Size(max = 200)
	private String name;

	private String author;
	
	private String link;
	
	@Column(columnDefinition="LONGTEXT")
	private String image;
	
	private Long count;

	 
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "book_category", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "categorys_id"))
	private Set<Category> categorys = new HashSet<>();
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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
	public Set<Category> getCategorys() {
		return categorys;
	}

	public void setCategorys(Set<Category> categorys) {
		this.categorys = categorys;
	}

	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}

	public Books(Long id ) {
		 
	}
	public Books(  ) {
		 
	}

	 
	
	 
	
	 
	 
}
