/**
 * 
 */
package com.aes.patrones.s2.notificador.cliente;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import com.aes.patrones.s2.notificador.cliente.api.whatsapp.AutenticacionResponse;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.ConfiguracionAPIWhatsApp;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.Contact;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.Hsm;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.Language;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.LocalizableParam;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.NotificacionHSM;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.ParametrosTemplate;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.RequestContact;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.WhatsAppResponse;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.WhatsAppResponseContact;
import com.aes.patrones.s2.notificador.dominio.CredencialesWhatsAppDTO;
import com.aes.patrones.s2.notificador.dominio.Notificacion;
import com.aes.patrones.s2.notificador.dominio.TokenAutenticacionWhatsApp1DTO;
import com.aes.patrones.s2.notificador.dominio.util.Resultado;
import com.aes.patrones.s2.notificador.util.HttpUtil;

@Repository
public class ClienteWhatsApp {
	
	private static final Logger log = LoggerFactory.getLogger(ClienteWhatsApp.class);

	private static final String AUTHORIZATION = "Authorization";
	
	@Autowired
	private ConfiguracionAPIWhatsApp configuracionAPIWhatsApp;
	
	@Autowired
	private TokenAutenticacionWhatsApp1DTO tokenAutenticacionWhatsApp;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ParametrosTemplate parametrosTemplate; 


	public Optional<AutenticacionResponse> obtenerTokenAutenticacion(CredencialesWhatsAppDTO credenciales) {
		HttpUtil.desactivarSSL();
		String url = credenciales.getServidor()+"/v1/users/login";
		HttpEntity<String> request = requestCredenciales(credenciales);
		ResponseEntity<AutenticacionResponse> responseEntity;
		try {
			responseEntity = restTemplate.exchange(url, HttpMethod.POST, request, AutenticacionResponse.class);
			if (!responseEntity.getStatusCode().isError()) {
				return Optional.of(responseEntity.getBody());	
			} else {
				log.error("Error de aplicación consumiendo el servicio de Autenticación. La conexión se pudo establecer y el error esta relacionado con los datos enviados. Valide que las credenciales configuradas en la base de datos aún sean validas. POST url: {}, body: {}, respuesta http_code: {}", url, request, responseEntity.getStatusCodeValue());
			}
		} catch(RestClientException e) {
			log.error("Error tratando de consumir servicio de autenticación de la API de WhatsApp expuestos en AWS (posiblemente de conexión)", e);
		}
		
		return Optional.empty();
	}
	
	public Resultado<Notificacion> enviar(Notificacion notificacion){
		HttpUtil.desactivarSSL(); 
		Resultado<Notificacion> resultado = new Resultado<>();
		
		if(!elContenidoEsValido(notificacion)) {
			
			resultado.setContenidoConError(notificacion, new Exception("contenido invalido"));
			log.debug("Contenido invalido: {}", resultado);
			return resultado;
		}
	
		String url = "(pendiente de cargar desde db)";
		HttpEntity<NotificacionHSM> request = null;
		
		try {
			
			url = getUrl();
			NotificacionHSM notificacionHSM= convertirHsm(notificacion);
			request = requestNotificacion(notificacionHSM);
			log.trace(">>>Enviando mensaje consumo del servico endPoint:{} con el objeto NotificacionHSM: {}", url, notificacionHSM);
			ResponseEntity<WhatsAppResponse> respuesta = restTemplate.exchange(url, HttpMethod.POST, request, WhatsAppResponse.class);
			
			if(esValido(respuesta)) {
				resultado.setContenido(notificacion);
			} else {

				resultado.setContenidoConError(notificacion, new Exception("NOTIFICACION_NO_ENVIADA: La respuesta del servicio de envío de notificaciones no es valida."));
				log.warn("Respuesta del API no esperada: {}", toString(respuesta));
			}
			
		}catch (RestClientResponseException e) {
			resultado.setContenidoConError(notificacion, e);
		} catch(RestClientException  e){
			log.error("Error consumiendo servicio de envío mensaje. POST url: {}, body: {}, excepción: {}", url, request, e);
			resultado.setContenidoConError(notificacion, e);
		} 
		
		return resultado;
	}


	private boolean esValido(ResponseEntity<WhatsAppResponse> response) {
		if(response.getBody() == null) return false;
		if(response.getBody().getMessages() == null) return false;
		if(response.getStatusCode().isError()) return false;
		
		return true;
	}
	
	private boolean esValidoContacto(ResponseEntity<WhatsAppResponseContact> response) {
		if(response.getBody() == null) return false;
		if(response.getBody().getContacts() == null) return false;
		if(response.getStatusCode().isError()) return false;
		
		return true;
	}


	private boolean elContenidoEsValido(Notificacion notificacion) {
		if (notificacion == null) return false;
		
		if (notificacion.getNombrePlantilla() == null ||
			notificacion.getCelularUsuario() == null) return false;

		if (notificacion.getNombrePlantilla().isEmpty() ||
				notificacion.getCelularUsuario().isEmpty()) return false;
		
		return true;

	}
	
	private boolean elContenidoEsValidoContacto(RequestContact contacts) {
				
		if (contacts.getContacts() == null ||
			contacts.getContacts().isEmpty()) return false;		
		
		return true;

	}

	
	private String getUrl() {
		String path = configuracionAPIWhatsApp.getPathWhatsApp();
		String host = configuracionAPIWhatsApp.getHostWhatsApp(); 
		return host + path;
	}
	
	private String getUrlContacts() {
		String path = configuracionAPIWhatsApp.getPathContacts();
		String host = configuracionAPIWhatsApp.getHostWhatsApp(); 
		return host + path;
	}



	private NotificacionHSM convertirHsm(Notificacion lEnvio) {
		
		ArrayList<LocalizableParam> localiz = new ArrayList<>();
		NotificacionHSM hsmM = new NotificacionHSM();
		Language hsmL = new Language();
		Hsm hsmF = new Hsm();
		hsmL.setCode(parametrosTemplate.getCode());
		hsmL.setPolicy(parametrosTemplate.getPolicy());
		hsmF.setLanguage(hsmL);
		if (lEnvio.getParametros() != null) {
			String[ ]split=lEnvio.getParametros().split("\\|");
			LocalizableParam localizParamsSplit;
			for(int i = 0; i < split.length; i++){ 
				localizParamsSplit=new LocalizableParam ();
				localizParamsSplit.setDefault(split[i]);
				localiz.add(localizParamsSplit);
			}
		}
	
		hsmF.setLocalizableParams(localiz);
		hsmF.setNamespace(parametrosTemplate.getNamespace());
		hsmF.setElementName(lEnvio.getNombrePlantilla());	
		hsmM.setTo(lEnvio.getCelularUsuario());
		hsmM.setType(parametrosTemplate.getHsm());	
		hsmM.setHsm(hsmF);
		log.trace("Se genera el NotificacionHSM para buildRequest idSuscriptor: {} ", hsmM.getTo());
	    return hsmM;
	}
	
	

	private HttpEntity<String> requestCredenciales(CredencialesWhatsAppDTO credenciales) {
		HttpHeaders headers = new HttpHeaders();
		headers.add(AUTHORIZATION, "Basic " + Base64.getEncoder().encodeToString((credenciales.getUsuario()+":"+credenciales.getContrasena()).getBytes()));
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		return new HttpEntity<>(headers);
	}

	private HttpEntity<NotificacionHSM> requestNotificacion(NotificacionHSM hsmMessage) {
		HttpHeaders headers = new HttpHeaders();
		String tokenBearer = tokenAutenticacionWhatsApp.getToken();
		headers.setBearerAuth(tokenBearer);
		headers.setContentType(MediaType.APPLICATION_JSON);
		log.trace("headers:{} ", headers);		
		return new HttpEntity<>(hsmMessage, headers);

	}
	
	private HttpEntity<RequestContact> requestContactMet(RequestContact contactMessage) {
		HttpHeaders headers = new HttpHeaders();
		String tokenBearer = tokenAutenticacionWhatsApp.getToken();
		headers.setBearerAuth(tokenBearer);
		headers.setContentType(MediaType.APPLICATION_JSON);
		log.trace("headers:{} ", headers);		
		return new HttpEntity<>(contactMessage, headers);

	}


	private String toString(ResponseEntity<WhatsAppResponse> response) {
		if(response == null) return "null";
		return String.format("HttpStatus:%s, Body:%s", response.getStatusCode().toString(),
													  (response.getBody()==null)?"null":response.getBody().toString());
	}
	

	public Resultado<List<Contact>> validarContacto(List<String> contactos){
		RequestContact rc = new RequestContact();
		rc.setContacts(contactos);
		rc.setBlocking(configuracionAPIWhatsApp.getContactBlocking());
		rc.setForceCheck(Boolean.valueOf(configuracionAPIWhatsApp.getContactCheck()));
		Resultado<List<Contact>> response = validarContactoRequest(rc);
		return response;
	}
	

	public Resultado<List<Contact>> validarContactoRequest(RequestContact contacts){
		
		Resultado<List<Contact>> resultado = new Resultado<>();	
		
		String url = "";
		
		if(!elContenidoEsValidoContacto(contacts)) {
			resultado.setError(new Exception("contacto invalido"));
			log.debug("Contenido invalido: {}", resultado);
			return resultado;
		}
		
		HttpEntity<RequestContact> request = null;
		
 		try {
			url = getUrlContacts();
			RequestContact requestContact = contacts;		
			request = requestContactMet(requestContact);
			ResponseEntity<WhatsAppResponseContact> respuesta = restTemplate.exchange(url, HttpMethod.POST, request, WhatsAppResponseContact.class);
			
			if(esValidoContacto(respuesta)) {
				resultado = Resultado.exitoso(respuesta.getBody().getContacts());
			} else {
					log.warn("Respuesta del API no esperada: {}, Resultado: {}", resultado);
				}
			
		} catch (Exception e) {
			log.debug("Error CONTROLADO ");
			log.warn("Respuesta del API no esperada: {}, Resultado: {}", resultado, e);
		}
				
		return resultado;		
		
	}
}
