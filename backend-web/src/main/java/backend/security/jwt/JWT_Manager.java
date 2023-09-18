package backend.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
 
import org.springframework.stereotype.Component;
import backend.BackEnd;
import backend.modal.User;

@Component
public class JWT_Manager implements Runnable {
	
 
	
	private Map<String , User>   ManagerUserLogin = new HashMap<>();
 
	public String RamDomUid() {
		return "";
	}
	 
	@Override
	public void run() {
		BackEnd.INFO(JWT_Manager.class,"REMOVE","removeExpiredJwts " + new Date().toString());
	 
	}

	public String getCountUserlogin() {
		return String.valueOf(ManagerUserLogin.size());
	}
}
