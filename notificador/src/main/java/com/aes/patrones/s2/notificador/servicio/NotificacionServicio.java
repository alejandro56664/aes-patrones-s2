package com.aes.patrones.s2.notificador.servicio;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import com.aes.patrones.s2.notificador.cliente.ClienteWhatsApp;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.Contact;
import com.aes.patrones.s2.notificador.dominio.Notificacion;
import com.aes.patrones.s2.notificador.dominio.util.Resultado;


@Component
public class NotificacionServicio {
	
	private static final Logger LOG = LoggerFactory.getLogger(NotificacionServicio.class);
	
	@Autowired
	private ClienteWhatsApp clienteWhatsApp;
	
	@Autowired
	private ActualizarTokenServicio tokenServicio;
	
	public boolean enviar(Notificacion notificacion) {
		
		tokenServicio.crearTokenSiEsNecesario();
		
		agregarCodigoPais(notificacion);
		
		Resultado<Notificacion> resultado = clienteWhatsApp.enviar(notificacion);
		
		if(!resultado.isExitoso()) {
			return verificarErrorContactoInvalido(resultado);
		}
		return resultado.isExitoso();
		
	}

	private void agregarCodigoPais(Notificacion notificacion) {
		String celularConCodigoPais = "57" + notificacion.getCelularUsuario().trim();
		notificacion.setCelularUsuario(celularConCodigoPais);
	}

	private boolean verificarErrorContactoInvalido(Resultado<Notificacion> resultado) {
		HttpClientErrorException exception = (HttpClientErrorException)resultado.getError().getCause();
		if(exception.getRawStatusCode() == 404) {
			//si recibimos un 404 es por que el contacto es desconocido.
			return procesarContactoDesconocido(resultado.getContenido());
		} else {
			LOG.error("Se produjo un error desconocido: {}", resultado.getError());
			return false;
		}
		
	}

	private boolean procesarContactoDesconocido(Notificacion notificacion) {
		List<String> contactos = new ArrayList<>();
		contactos.add(notificacion.getCelularUsuario());
		Resultado<List<Contact>> resultado = clienteWhatsApp.validarContacto(contactos);
		if(!resultado.isExitoso()) {
			LOG.error("el contacto {} no pudo ser validado. Error: {}", contactos.get(0), resultado.getError());
			return false;
		} else {
			//reintentamos el envío
		    Resultado<Notificacion> resultado2doEnvio = clienteWhatsApp.enviar(notificacion);
		    return resultado2doEnvio.isExitoso();
		}
		
	}

}
