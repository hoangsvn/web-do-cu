package backend.restcontrollers;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import javax.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
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

	@Autowired
	private Environment env;

	private int clearimage = 30;

	@Bean
	public void BeanActive() {

		try {
			clearimage = Integer.parseInt(env.getProperty("backend.app.time.clearimage"));
			 
		} catch (Exception e) {

		}
		BackEnd.INFO(BackEnd_Runnable.class, "RUNABLE AFFTER =>" + clearimage + " MINUTES", "DELETE IMAGE BY LINK");
		executor = Executors.newSingleThreadScheduledExecutor();
		executor.scheduleAtFixedRate(this, clearimage, clearimage, TimeUnit.MINUTES);
	}

   
 

	@PreDestroy
    public void destroy() {
        if (executor != null && !executor.isShutdown()) {
        	BackEnd.INFO(BackEnd_Runnable.class, "SHUTDOWN RUNABLE ","DELETE IMAGE BY LINK");
            executor.shutdown();
        }
    }
	
	
	@Override
	public void run() {
		Clear();
	}

	public synchronized void Clear() {
		try {
			List<String> listHA = repository_HinhAnh.getListStringLink();
			List<String> listImage = repository_Image_Byte.getListStringLink();
			for (String string : listImage) {
				if (!listHA.contains(string)) {
					Long id = repository_Image_Byte.getIDbyLink(string);
					repository_Image_Byte.deleteById(id);
				}
			}
			
		} catch (Exception e) {
			BackEnd.ERROR(BackEnd_Runnable.class, "ERROR CLEAR IMAGE BY LINK", "IMAGE"+e.getMessage());
		}

	}
}
