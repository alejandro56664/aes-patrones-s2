/**
 * 
 */
package com.aes.patrones.s2.notificador.cliente.api.whatsapp;


public class ConfiguracionAPIWhatsApp {
	
	private String hostWhatsApp;
	private String pathWhatsApp;
	private String tokenBearer;
	private String pathContacts;
	private String contactBlocking;
	private String contactCheck;
	
	public String getContactBlocking() {
		return contactBlocking;
	}

	public void setContactBlocking(String contactBlocking) {
		this.contactBlocking = contactBlocking;
	}

	public String getContactCheck() {
		return contactCheck;
	}

	public void setContactCheck(String contactCheck) {
		this.contactCheck = contactCheck;
	}

	public String getPathContacts() {
		return pathContacts;
	}

	public void setPathContacts(String pathContacts) {
		this.pathContacts = pathContacts;
	}

	public String getHostWhatsApp() {
		return hostWhatsApp;
	}

	public void setHostWhatsApp(String hostWhatsApp) {
		this.hostWhatsApp = hostWhatsApp;
	}

	public String getPathWhatsApp() {
		return pathWhatsApp;
	}

	public void setPathWhatsApp(String pathWhatsApp) {
		this.pathWhatsApp = pathWhatsApp;
	}

	public String getTokenBearer() {
		return tokenBearer;
	}

	public void setTokenBearer(String tokenBearer) {
		this.tokenBearer = tokenBearer;
	}
	
}
