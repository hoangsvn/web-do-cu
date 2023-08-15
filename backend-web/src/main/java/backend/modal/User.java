package backend.modal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),	@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 80)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;
	


	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

 
	@OneToMany (fetch = FetchType.LAZY,cascade = CascadeType.ALL,targetEntity = SanPham.class,mappedBy = "user_id")
	private List<SanPham> listsanphamid = new ArrayList<>();
	
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,targetEntity = DiaChi.class,mappedBy = "user_id")
	private List<DiaChi> listdiachi ;
	
    @OneToOne(cascade = CascadeType.ALL ,targetEntity = UserInFo.class)
    @JoinColumn(name = "id", referencedColumnName = "userid")
	private UserInFo userinfo ;
	
	public UserInFo getUserinfo() {
		return userinfo;
	}
	public void setUserinfo(UserInFo userinfo) {
		this.userinfo = userinfo;
	}
	
	public List<DiaChi> getListdiachi() {
		return listdiachi;
	}
	public void setListdiachi(List<DiaChi> listdiachi) {
		this.listdiachi = listdiachi;
	}
	public User() {
	}
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,targetEntity = Cart.class ,mappedBy = "user_id")
	private List<Cart> cart = new ArrayList<>();
	
	public List<Cart> getCart() {
		return cart;
	}
	
	public void setCart(List<Cart> cart) {
		this.cart = cart;
	}
	
	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	
	public List<SanPham> getListsanphamid() {
		return listsanphamid;
	}
	public void setListsanphamid(List<SanPham> listsanphamid) {
		this.listsanphamid = listsanphamid;
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

 
	
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", roles="
				+ roles + ", getId()=" + getId() + ", getUsername()=" + getUsername() + ", getEmail()=" + getEmail()
				+ ", getPassword()=" + getPassword() + ", getRoles()=" + getRoles() + "]";
	}
	
	
}
