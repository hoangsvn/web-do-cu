package backend.payload.request;

public class Resquest_Notification {
	private String title;
	private String body;
	public String getBody() {
		return body;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setBody(String body) {
		this.body = body;
	}
}
