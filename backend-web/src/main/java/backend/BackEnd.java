package backend;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BackEnd {

    public static void InFo(String key, String value) {
        Logger logger = LoggerFactory.getLogger(BackEnd.class);
        logger.info(String.format("%-30s : %s ", key, (value == null ? "" : value)));
    }

    public static void InFo(String key, Integer value) {
        Logger logger = LoggerFactory.getLogger(BackEnd.class);
        logger.info(String.format("%-30s : %s ", key, (value == null ? 0 : value)));
    }

    public static void InFo(String key) {
        Logger logger = LoggerFactory.getLogger(BackEnd.class);
        logger.info(String.format("%-30s", key));

    }

    public static String RamdomNameImage() {
        return DateToString() + "-" + UUID.randomUUID().toString() + ".png";
    }

    public static String Ramdomkey() {
        return UUID.randomUUID().toString();
    }

    public static String DateToString() {
        return new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date());
    }

    public static String getDateTime() {
        return new SimpleDateFormat("yyyy:MM:dd:HH:mm:sss").format(new Date());
    }

    public static String EncodePassWord(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }

}
