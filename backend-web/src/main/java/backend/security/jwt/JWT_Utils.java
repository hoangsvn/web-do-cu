package backend.security.jwt;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import backend.payload.response.Response_JWT;
import backend.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;

@Component
public class JWT_Utils {
	
	private static final Logger logger = LoggerFactory.getLogger(JWT_Utils.class);

	@Value("${backend.app.jwtSecret}")
	private String jwtSecret;

	@Value("${backend.app.jwtExpirationMs}")
	private int jwtExpirationMs;
	
 
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public String generateJwtToken(Authentication authentication) {
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		return Jwts.builder()
				 
				.setAudience(userPrincipal.getEmail())
				.setId(String.valueOf(userPrincipal.getId()))
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())	
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
			
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}
	
	public Object Login(String username,String password){
		Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(username, password));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()) .collect(Collectors.toList());
		return new Response_JWT(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles);
	}

	public UserDetailsImpl getUserDetailsImpl(Authentication authentication) {
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		return userPrincipal;
	}
	
	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}
	public Date getExpirationDateFromJwtToken(String jwtToken) {
	    try {
			Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
	        return claims.getExpiration();
	    } catch (Exception e) {
	        return null;
	    }
	}

	 
	
	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}
		return false;
	}
}
