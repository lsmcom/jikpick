package kr.it.code.main.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	@Bean
	public WebSecurityCustomizer  wbSecurityCustomizer() {
		return (web)-> web.ignoring()
				.requestMatchers("/**")
				.requestMatchers(PathRequest.toStaticResources().atCommonLocations());
	}

	
}
