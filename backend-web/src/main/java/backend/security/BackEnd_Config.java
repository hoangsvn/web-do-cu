package backend.security;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import backend.BackEnd;

@Configuration
public class BackEnd_Config implements WebMvcConfigurer, WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        ErrorPage P400 = new ErrorPage(HttpStatus.BAD_REQUEST, "/backend/error=400");
        ErrorPage P401 = new ErrorPage(HttpStatus.UNAUTHORIZED, "/backend/error=401");
        ErrorPage P403 = new ErrorPage(HttpStatus.FORBIDDEN, "/backend/error=403");
        ErrorPage P404 = new ErrorPage(HttpStatus.NOT_FOUND, "/backend/error=404");
        ErrorPage P405 = new ErrorPage(HttpStatus.METHOD_NOT_ALLOWED, "/backend/error=405");
        ErrorPage P406 = new ErrorPage(HttpStatus.NOT_ACCEPTABLE, "/backend/error=406");
        ErrorPage P408 = new ErrorPage(HttpStatus.REQUEST_TIMEOUT, "/backend/error=408");
        ErrorPage P415 = new ErrorPage(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "/backend/error=415");
        ErrorPage P500 = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/backend/error=500");
        factory.addErrorPages(P400, P401, P403, P404, P405, P406, P408, P415, P500);
        InFo();
    }

    public String Ip() {
        try {
            URL url = new URL(env.getProperty("backend.app.checkip"));
            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
            String ipAddress = reader.readLine();
            reader.close();
            return ipAddress;
        } catch (IOException e) {
            return "CHECK FAIL";
        }
    }

    @Autowired
    private Environment env;

    public void InFo() {
        int port = env.getProperty("server.port") == null ? 8080 : Integer.parseInt(env.getProperty("server.port"));
        try {
            BackEnd.InFo("+==================================================================+");
            BackEnd.InFo("MY-SQL URL", 		env.getProperty("spring.datasource.url"));
            BackEnd.InFo("MY-SQL USERNAME", env.getProperty("spring.datasource.username"));
            BackEnd.InFo("MY-SQL PASSWORD", env.getProperty("spring.datasource.password"));
            BackEnd.InFo("SERVER  PORT", 	String.valueOf(port));
            BackEnd.InFo("CONTEXT PATH", 	env.getProperty("server.servlet.context-path"));
            BackEnd.InFo("LOCAL PC/IP ", 	InetAddress.getLocalHost().toString());
            BackEnd.InFo("PUBLIC IP ", 		Ip());
            BackEnd.InFo("APP NAME", 		env.getProperty("app.name"));
            BackEnd.InFo("APP DESCRIPTION", env.getProperty("app.description"));
            BackEnd.InFo("APP VERSION", 	env.getProperty("app.version"));
            BackEnd.InFo("JAVA VERSION", 	env.getProperty("java.version"));
            BackEnd.InFo("BACKEND MWC CONFIG", "OK");
        } catch (IOException e) {
            BackEnd.InFo("BACKEND MWC CONFIG", "FAIL");
        }
        BackEnd.InFo("+==================================================================+");
    }
}
