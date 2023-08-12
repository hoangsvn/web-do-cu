package backend.restcontrollers;

 
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import backend.BackEnd;
import backend.repository.Repository_HinhAnh;
import backend.repository.Repository_Image_Byte;
@Service
public class BackEnd_Runnable implements Runnable {

	@Autowired
	private Repository_HinhAnh repository_HinhAnh;
	
	@Autowired
	private Repository_Image_Byte repository_Image_Byte;
	
	private ScheduledExecutorService executor;

	@Bean
	public void BeanActive() {
		BackEnd.InFo("STAT RUNABLE " , "DELETE IMAGE BY LINK");
		executor = Executors.newSingleThreadScheduledExecutor();
        executor.scheduleAtFixedRate(this, 0, 1, TimeUnit.MINUTES);
	}
	
	@Override
	public void run() {
		Clear();
	}
 
	public synchronized void Clear() {
		BackEnd.InFo("START CLEAR IMAGE BY LINK","IMAGE");
		try {
			List<String> listHA = repository_HinhAnh.getListStringLink();
			List<String> listImage = repository_Image_Byte.getListStringLink();
			for (String string : listImage) {
				if (!listHA.contains(string)) {
					Long id = repository_Image_Byte.getIDbyLink(string);
					repository_Image_Byte.deleteById(id);
				}
			}			
			BackEnd.InFo("END CLEAR IMAGE BY LINK","IMAGE");
			
		} catch (Exception e) {
			e.printStackTrace();
			BackEnd.InFo("ERROR CLEAR IMAGE BY LINK","IMAGE");
		}
		
	}
}
