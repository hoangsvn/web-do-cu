package backend.security.jwt; 
import java.util.HashMap;
import java.util.Map;
import java.util.UUID; 
import org.springframework.stereotype.Component; 
import backend.modal.User;

@Component
public class JWT_Manager implements Runnable {
	
 
	
	private Map<String , User>   ManagerUserLogin = new HashMap<>();
 
	public String RamDomUid() {
		return UUID.randomUUID().toString();
	}
	 
	@Override
	public void run() {
 
	}

	public String getCountUserlogin() {
		return String.valueOf(ManagerUserLogin.size());
	}
}
