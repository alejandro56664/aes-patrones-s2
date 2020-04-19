/**
 * 
 */
package com.aes.patrones.s2.notificador.dominio;

public class Notificacion{
	
	private String celularUsuario;

	private String nombrePlantilla;

	private String parametros;
	
	public Notificacion(String celularUsuario, String idTemplate, String localizableParams) {
		super();
		this.celularUsuario = celularUsuario;
		this.nombrePlantilla = idTemplate;
		this.parametros = localizableParams;
	}
	

	public Notificacion() {
		
	}


	public String getCelularUsuario() {
		return celularUsuario;
	}


	public void setCelularUsuario(String celularUsuario) {
		this.celularUsuario = celularUsuario;
	}


	public String getNombrePlantilla() {
		return nombrePlantilla;
	}


	public void setNombrePlantilla(String nombrePlantilla) {
		this.nombrePlantilla = nombrePlantilla;
	}


	public String getParametros() {
		return parametros;
	}


	public void setParametros(String parametros) {
		this.parametros = parametros;
	}
	
	

}
