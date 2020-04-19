package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"contacts",
	"meta",
	"errors"
})
public class WhatsAppResponseContact {

	@JsonProperty("contacts")
	private List<Contact> contacts = null;
	@JsonProperty("meta")
	private Meta meta;
	@JsonProperty("errors")
	private List<WhatsAppErrors> errors = null;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("contacts")
	public List<Contact> getContacts() {
		return contacts;
	}

	@JsonProperty("contacts")
	public void setContacts(List<Contact> contacts) {
		this.contacts = contacts;
	}

	@JsonProperty("meta")
	public Meta getMeta() {
		return meta;
	}

	@JsonProperty("meta")
	public void setMeta(Meta meta) {
		this.meta = meta;
	}

	@JsonProperty("errors")
	public List<WhatsAppErrors> getErrors() {
		return errors;
	}

	@JsonProperty("errors")
	public void setErrors(List<WhatsAppErrors> errors) {
		this.errors = errors;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

	@Override
	public String toString() {
		return "WhatsAppResponseContact [contacts=" + contacts + ", meta=" + meta + ", errors=" + errors + "]";
	}

}