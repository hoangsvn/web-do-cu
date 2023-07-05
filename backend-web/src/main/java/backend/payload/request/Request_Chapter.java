package backend.payload.request;

import java.util.Date;

 

public class Request_Chapter {
	private  long id;
	
	private long bookid;
	
	private String name;
	
	private Date dateSubmitted;
	
	private String content;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getBookid() {
		return bookid;
	}

	public void setBookid(long bookid) {
		this.bookid = bookid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDateSubmitted() {
		return dateSubmitted;
	}

	public void setDateSubmitted(Date dateSubmitted) {
		this.dateSubmitted = dateSubmitted;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	 
	 
}
