package com.aes.patrones.s2.notificador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class NotificadorApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificadorApplication.class, args);
	}
	
	@Bean
	public RestTemplate restTemplate() {
	    SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
	    
	    return new RestTemplate(requestFactory);
	}
}
