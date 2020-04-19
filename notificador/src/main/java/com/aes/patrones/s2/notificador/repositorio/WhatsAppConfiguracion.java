package com.aes.patrones.s2.notificador.repositorio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.aes.patrones.s2.notificador.cliente.api.whatsapp.AutenticacionResponse;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.ConfiguracionAPIWhatsApp;
import com.aes.patrones.s2.notificador.cliente.api.whatsapp.ParametrosTemplate;
import com.aes.patrones.s2.notificador.dominio.CredencialesWhatsAppDTO;
import com.aes.patrones.s2.notificador.dominio.TokenAutenticacionWhatsApp1DTO;


@Component
public class WhatsAppConfiguracion {

	@Value("${whatsapp.token.esperaRefrescar:518400000}")
	private static String WHATSAPP_TOKEN_ESPERA_REFRESCAR;
	
	private static String WHATSAPP_TOKEN_EXPIRACION = "";
	
	private static String WHATSAPP_TOKEN_BEARER = "";
	
	@Value("${whatsapp.api.contrasena}")
	private String WHATSAPP_API_CONTRASENA = "";
	
	@Value("${whatsapp.api.usuario}")
	private String WHATSAPP_API_USUARIO = "";
	
	@Value("${whatsapp.api.host}")
	private String WHATSAPP_API_HOST = "";
	
	@Value("${whatsapp.api.path}")
	private String WHATSAPP_API_PATH = "";
	
	@Value("${whatsapp.api.path.contacts}")
	private String WHATSAPP_API_PATH_CONTACTS = "";
	
	@Value("${whatsapp.contact.check}")
	private String WHATSAPP_API_CONTACT_CHECK = "";
	
	@Value("${whatsapp.contact.blocking}")
	private String WHATSAPP_API_CONTACT_BLOCKING = "";
	
	@Value("${whatsapp.template.code}")
	private String WHATSAPP_TEMPLATE_CODE= "";
	
	@Value("${whatsapp.template.policy}")
	private String WHATSAPP_TEMPLATE_POLICY= "";
	
	@Value("${whatsapp.template.namespace}")
	private String WHATSAPP_TEMPLATE_NAMESPACE= "";
	
	@Value("${whatsapp.template.hsm}")
	private String WHATSAPP_TEMPLATE_HSM= "";


	private  Logger LOG = LoggerFactory.getLogger(WhatsAppConfiguracion.class);
	
	
	
	
	public ParametrosTemplate parametrosTemplate(){
		ParametrosTemplate parametroTemplate = new ParametrosTemplate();

		parametroTemplate.setCode(WHATSAPP_TEMPLATE_CODE);
		parametroTemplate.setPolicy(WHATSAPP_TEMPLATE_POLICY);
		parametroTemplate.setNamespace(WHATSAPP_TEMPLATE_NAMESPACE);
		parametroTemplate.setHsm(WHATSAPP_TEMPLATE_HSM);
		
		LOG.debug("ParametrosTemplate cargados en memoria");
		
		return parametroTemplate;
	}
	
	public boolean guardarTokenAutenticacion(AutenticacionResponse auth) {
		if (!auth.getUsers().isEmpty()) {
			WHATSAPP_TOKEN_BEARER = auth.getUsers().get(0).getToken();
			WHATSAPP_TOKEN_EXPIRACION = auth.getUsers().get(0).getExpiresAfter();
			LOG.debug("Se guardó en la tabla de configuración el token actualizado y la fecha de expiración");
			return true;
		} else {
			//la lista de usuario de autenticación llegó vacia
			LOG.warn("Respuesta no esperada desde API de Autenticación WhatsApp: la lista de usuarios autenticados esta vacia. Se requiere al menos un Objeto User con token valido y fecha de expiración");
			return false;
		}
	}


	public CredencialesWhatsAppDTO cargarCredenciales() {
		
		CredencialesWhatsAppDTO credenciales = new CredencialesWhatsAppDTO();
		credenciales.setContrasena(WHATSAPP_API_CONTRASENA);
		credenciales.setUsuario(WHATSAPP_API_USUARIO);
		credenciales.setServidor(WHATSAPP_API_HOST);
		
		return credenciales;
		
	}
	
	public TokenAutenticacionWhatsApp1DTO cargarTokenAutenticacion() {
		
		TokenAutenticacionWhatsApp1DTO tokenAut = new TokenAutenticacionWhatsApp1DTO();
		tokenAut.setPeriodoRefrescar(WHATSAPP_TOKEN_ESPERA_REFRESCAR);
		tokenAut.setToken(WHATSAPP_TOKEN_BEARER);
		tokenAut.setExpiracion(WHATSAPP_TOKEN_EXPIRACION);
		
		return tokenAut;
		
	}
	
	public ConfiguracionAPIWhatsApp configuracionAPIWhatsApp() {
		ConfiguracionAPIWhatsApp configWhatsApp = new ConfiguracionAPIWhatsApp();

		configWhatsApp.setHostWhatsApp(WHATSAPP_API_HOST);
		configWhatsApp.setPathWhatsApp(WHATSAPP_API_PATH);
		configWhatsApp.setTokenBearer(WHATSAPP_TOKEN_BEARER);
		configWhatsApp.setPathContacts(WHATSAPP_API_PATH_CONTACTS);
		configWhatsApp.setContactCheck(WHATSAPP_API_CONTACT_CHECK);
		configWhatsApp.setContactBlocking(WHATSAPP_API_CONTACT_BLOCKING);
		
		return configWhatsApp;
	}


	
}
