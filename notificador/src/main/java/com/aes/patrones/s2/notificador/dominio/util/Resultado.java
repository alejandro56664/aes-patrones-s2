package com.aes.patrones.s2.notificador.dominio.util;

public class Resultado<T> {
	 
	private boolean exitoso = false;
	
	private T contenido;
	
	private long timestamp;
	
	private Exception excepcion;
	
	
	public static <T> Resultado<T> exitoso(T contenido) {
		Resultado<T> resultado = new Resultado<>();
		resultado.setContenido(contenido);
		return resultado;
	}
	
	public static <T> Resultado<T> fallido(T contenido, Exception error) {
		Resultado<T> resultado = new Resultado<>();
		resultado.setContenidoConError(contenido, error);
		return resultado;
	}
	
	
	public static <T> Resultado<T> fallido(Exception error) {
		Resultado<T> resultado = new Resultado<>();
		resultado.setError(error);
		return resultado;
	}

	public void setContenidoConError(T contenido, Exception error) {
		this.contenido = contenido;
		setError(error);
	}

	public void setContenido(T contenido) {
		this.contenido = contenido;
		this.exitoso = excepcion == null;
		this.timestamp = System.currentTimeMillis();
	}

	public void setError(Exception error) {
		this.excepcion = error;
		this.exitoso = false;
		this.timestamp = System.currentTimeMillis();
	}
	
	public Exception getError() {
		return excepcion;
	}

	public void setExitoso() {
		this.exitoso=true;
		
	}
	
	public long getTimestamp() {
		return timestamp;
	}
	
	public boolean isExitoso() {
		return exitoso;
	}

	public T getContenido() {
		return contenido;
	}
	



	@Override
	public String toString() {
		return String.format("Resultado: { Exitoso: %s, Error: %s, Contenido: %s, cursor: %d }",
				this.isExitoso(), 
				this.getError() == null ? "null" : this.getError().toString(),
				this.getContenido() == null ? "null" : this.getContenido().toString()
				);
	}
	
	
	
	
	
}
