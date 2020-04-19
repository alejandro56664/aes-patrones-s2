package com.aes.patrones.s2.notificador.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aes.patrones.s2.notificador.cliente.ClienteWhatsApp;
import com.aes.patrones.s2.notificador.dominio.TokenAutenticacionWhatsApp1DTO;
import com.aes.patrones.s2.notificador.repositorio.WhatsAppConfiguracion;


@Component
public class ActualizarTokenServicio {
	
	private static final Logger LOG = LoggerFactory.getLogger(ActualizarTokenServicio.class);
	
	
	@Autowired
	private TokenAutenticacionWhatsApp1DTO tokenAutenticacionWhatsApp;
	
	@Autowired
	private WhatsAppConfiguracion autenticacionDAO;
	
	@Autowired
	private ClienteWhatsApp clienteWhatsApp;
	
	public void renovarToken() {
		clienteWhatsApp.obtenerTokenAutenticacion(autenticacionDAO.cargarCredenciales())
		.ifPresent(token -> {
			if (autenticacionDAO.guardarTokenAutenticacion(token)) {
				String ntoken = autenticacionDAO.cargarTokenAutenticacion().getToken();
				LOG.debug("Token {}",ntoken);
			    tokenAutenticacionWhatsApp.setToken(ntoken);
			}	
		});
	}
	
	public void crearTokenSiEsNecesario() {
		if(tokenAutenticacionWhatsApp.getToken().isEmpty()) {
			renovarToken();
		}
	}

}
