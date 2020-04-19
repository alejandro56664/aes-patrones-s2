package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

public class ParametrosTemplate {

	private String code;
	private String policy;
	private String namespace;
	private String hsm;
	

	public String getNamespace() {
		return namespace;
	}
	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}
	public String getHsm() {
		return hsm;
	}
	public void setHsm(String hsm) {
		this.hsm = hsm;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getPolicy() {
		return policy;
	}
	public void setPolicy(String policy) {
		this.policy = policy;
	}
	
	
}
