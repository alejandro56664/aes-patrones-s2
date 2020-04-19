package com.aes.patrones.s2.notificador.jobs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.aes.patrones.s2.notificador.servicio.ActualizarTokenServicio;

@Component
public class ActualizarTokenJob {
	
	private static final Logger LOG = LoggerFactory.getLogger(ActualizarTokenJob.class);
	
	
	@Autowired
	private ActualizarTokenServicio actualizarTokenServicio;
	
	@Scheduled(fixedDelayString = "#{TokenAutenticacionWhatsApp1DTO.periodoRefrescar}")
	public void renovarTokenTask() {
		LOG.info("Arranca ejecucion de job actualizar token de whatsapp");
		actualizarTokenServicio.renovarToken();
		
	}
	



}
