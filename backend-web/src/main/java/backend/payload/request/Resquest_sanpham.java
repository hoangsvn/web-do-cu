package backend.payload.request;

import java.util.ArrayList;
import java.util.List;

import backend.modal.DanhMuc;
import backend.modal.HinhAnh;
 

public class Resquest_sanpham  {
	
	private Long id;
	private Long listimgsize;
	private Long danhmucid;
	private Long user_id;
	private Long price;
	private String name;
	private String desiption; 
	
	private List<HinhAnh> listhinhanh =new ArrayList<>();
	
	private List<DanhMuc> listdanhmuc =new ArrayList<>();
	
	
	public void setId(Long id) {
		this.id = id;
	}
	public Long getId() {
		return id;
	}
	public Long getListimgsize() {
		return listimgsize;
	}
	public void setListimgsize(Long listimgsize) {
		this.listimgsize = listimgsize;
	}
	public Long getDanhmucid() {
		return danhmucid;
	}
	public void setDanhmucid(Long danhmucid) {
		this.danhmucid = danhmucid;
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
	public List<DanhMuc> getListdanhmuc() {
		return listdanhmuc;
	}
	public void setListdanhmuc(List<DanhMuc> listdanhmuc) {
		this.listdanhmuc = listdanhmuc;
	}
	@Override
	public String toString() {
		return "Resquest_sanpham [listimgsize=" + listimgsize + ", danhmucid=" + danhmucid + ", user_id=" + user_id
				+ ", price=" + price + ", name=" + name + ", desiption=" + desiption + ", listhinhanh=" + listhinhanh
				+ ", listdanhmuc=" + listdanhmuc + "]";
	}	
}
