package com.aes.patrones.s2.notificador.dominio;

public class TokenAutenticacionWhatsApp1DTO {
	private String token;
	private String periodoRefrescar;
	private String expiracion;
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getPeriodoRefrescar() {
		return periodoRefrescar;
	}
	public void setPeriodoRefrescar(String periodoRefrescar) {
		this.periodoRefrescar = periodoRefrescar;
	}
	public String getExpiracion() {
		return expiracion;
	}
	public void setExpiracion(String expiracion) {
		this.expiracion = expiracion;
	}
	
}
