package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

import java.util.List;

public class AutenticacionResponse {
	private List<UsuarioAutenticacion> users;
	private MetaAutenticacion meta;
	public List<UsuarioAutenticacion> getUsers() {
		return users;
	}
	public void setUsers(List<UsuarioAutenticacion> users) {
		this.users = users;
	}
	public MetaAutenticacion getMeta() {
		return meta;
	}
	public void setMeta(MetaAutenticacion meta) {
		this.meta = meta;
	}
	
}