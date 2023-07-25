package backend.modal;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
 


@Entity
@Table(name = "sanphan")
public class SanPham {
	private Integer id;
	private Integer user_id;
	private Integer price;
	private String name;
	private Date create_at;
	private String desiption;
	
}
