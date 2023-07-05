package backend.payload.response;

public class Response_Message {
	private String message ;
	private String type;
	private boolean success ;
	
 
	public Response_Message(String message,String type ,boolean ok) {
		this.message = message;
		this.type = type;
		this.success = ok;
	}
	 
	public boolean isSuccess() {
		return success;
	}
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	


	
}
