package com.aes.patrones.s2.notificador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.aes.patrones.s2.notificador.cliente.api.whatsapp.ConfiguracionAPIWhatsApp;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.ParametrosTemplate;
import com.aes.patrones.s2.notificador.dominio.TokenAutenticacionWhatsApp1DTO;
import com.aes.patrones.s2.notificador.repositorio.WhatsAppConfiguracion;

@Configuration
public class WhatsAppConfig {
	
	
	@Autowired
	private WhatsAppConfiguracion wappconfig;

	
	@Bean 
	public ConfiguracionAPIWhatsApp configuracionAPIWhatsApp() {
		return wappconfig.configuracionAPIWhatsApp();
	}
	
	@Bean("TokenAutenticacionWhatsApp1DTO")
	public TokenAutenticacionWhatsApp1DTO crearAutenticacionTokenBean() {
		TokenAutenticacionWhatsApp1DTO result;
		result = wappconfig.cargarTokenAutenticacion();
		return result;
	}
	
	@Bean
	public ParametrosTemplate parametrosTemplate(){
		return wappconfig.parametrosTemplate();
	}

}
