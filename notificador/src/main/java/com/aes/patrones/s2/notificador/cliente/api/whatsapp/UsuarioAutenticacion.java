package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UsuarioAutenticacion {
	
	private String token;

	@JsonProperty("expires_after")
	private String expiresAfter;
	
	public UsuarioAutenticacion() {
		super();
	}

	public UsuarioAutenticacion(String token, String expiresAfter) {
		super();
		this.token = token;
		this.expiresAfter = expiresAfter;
	}
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getExpiresAfter(){
		return expiresAfter;
	}
	public void setExpiresAfter(String expiresAfter){
		this.expiresAfter = expiresAfter;
	}
}
