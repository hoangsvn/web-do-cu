package backend.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.springframework.stereotype.Component;
import backend.BackEnd;

@Component
public class JWT_Manager implements Runnable {
	
	
//	@Bean
//	private void Run() {
//		BackEnd.InFo("STAT RUNABLE " , "DEL JWT  1P");
//		startCleaner();
//	}
	
	private Map<String, String>   MapactiveUserName_Token = new HashMap<>();
	private Map<String, JWT_InFo> MapactiveToken_JWT_Info = new HashMap<>();

	public synchronized void addActiveUserNameAndToken(String user, String token) {
		String tkold = MapactiveUserName_Token.get(user);
		if (tkold!=null) {
			removeJwt(tkold);
		} else {
			MapactiveUserName_Token.put(user, token);
		}
		
	}
	
	
	public synchronized void addActiveJwt(String jwtToken, Date expirationDate) {
		JWT_InFo activeJwt = new JWT_InFo();
		activeJwt.setToken(jwtToken);
		activeJwt.setExpirationDate(expirationDate);
		MapactiveToken_JWT_Info.put(jwtToken, activeJwt);
	}

	public synchronized void removeExpiredJwts() {
		Date now = new Date();
		for (Entry<String, JWT_InFo> entry : MapactiveToken_JWT_Info.entrySet()) {
			String token = entry.getKey();
			JWT_InFo jwt = entry.getValue();
			if (jwt.getExpirationDate().before(now)) {
				MapactiveToken_JWT_Info.remove(token);
			}
		}
	}

	public synchronized void removeJwt(String key) {
		try {
			MapactiveToken_JWT_Info.remove(key);
		} catch (Exception e) {
			 
		}
	}

	public synchronized int getActiveJwtCount() {
		return MapactiveToken_JWT_Info.size();
	}

	public void startCleaner() {
        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        executor.scheduleAtFixedRate(this, 0, 1, TimeUnit.HOURS);
    }
	
	@Override
	public void run() {
		BackEnd.INFO(JWT_Manager.class,"REMOVE","removeExpiredJwts " + new Date().toString());
		removeExpiredJwts();
	}
}
