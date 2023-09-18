package backend;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BackEnd {

    public static void INFO(Class<?> clazz  ,String ...value) {
    	Logger logger = LoggerFactory.getLogger(clazz);
        if (value.length > 0) {
            StringBuilder logMessage = new StringBuilder(String.format("%-30s :", value[0])); 
            if (value.length > 1) {
                for (int i = 1; i < value.length; i++) {
                    logMessage.append(" ").append(value[i]);
                }
            }
            
            logger.info(logMessage.toString());
        }
    }
    public static void ERROR(Class<?> clazz  ,String ...value) {
    	Logger logger = LoggerFactory.getLogger(clazz);
        if (value.length > 0) {
            StringBuilder logMessage = new StringBuilder(String.format("%-30s :", value[0]));
            if (value.length > 1) {
                for (int i = 1; i < value.length; i++) {
                    logMessage.append(" ").append(value[i]);
                }
            }
            
            logger.error(logMessage.toString());
        }
    }
    public static void WARM(Class<?> clazz  ,String ...value) {
    	Logger logger = LoggerFactory.getLogger(clazz);
        if (value.length > 0) {
            StringBuilder logMessage = new StringBuilder(String.format("%-30s :", value[0])); 
            if (value.length > 1) {
                for (int i = 1; i < value.length; i++) {
                    logMessage.append(" ").append(value[i]);
                }
            }
            
            logger.warn(logMessage.toString());
        }
    }
    public static String RamdomNameImage() {
        return DateToString()+ "-" + Ramdomkey()+"-"+ Ramdomkey() + ".png";
    }

    public static String Ramdomkey() {
        return UUID.randomUUID().toString();
    }

    public static String DateToString() {
        return new SimpleDateFormat("yyyy-MM-dd-HH-mm-sss").format(new Date());
    }

    public static String getDateTime() {
        return new SimpleDateFormat("yyyy:MM:dd:HH:mm:sss").format(new Date());
    }

    public static String EncodePassWord(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
   
}
