/**
 * 
 */
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
"messages",
"meta",
"errors"
})

public class WhatsAppResponse {
	
	@JsonProperty("messages")
	private List<Message> messages = null;
	@JsonProperty("meta")
	private Meta meta;
	@JsonProperty("errors")
	private List<WhatsAppErrors> errors = null;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<>();

	@JsonProperty("messages")
	public List<Message> getMessages() {
	return messages;
	}

	@JsonProperty("messages")
	public void setMessages(List<Message> messages) {
	this.messages = messages;
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

	
	public WhatsAppResponse(List<Message> messages, Meta meta, List<WhatsAppErrors> errors) {
		super();
		this.messages = messages;
		this.meta = meta;
		this.errors = errors;
	}
	
	public WhatsAppResponse(List<Message> messages, Meta meta) {
		super();
		this.messages = messages;
		this.meta = meta;
	}

	public WhatsAppResponse(Meta meta, List<WhatsAppErrors> errors) {
		super();
		this.meta = meta;
		this.errors = errors;
	}

	public WhatsAppResponse() {
		super();
		
	}
	
	@Override
	public String toString() {
		StringBuilder result = new StringBuilder();
		result.append("WhatsAppResponse { ");
		result.append("meta: ")
			  .append(meta.toString());
		if(this.messages != null) {
			result.append("messages: [");
			for(Message message : messages) {
				result.append(message.toString());
			}
			result.append("] ");
		}
		
		if(this.errors != null) {
			result.append("errors: [");
			for(WhatsAppErrors error : errors) {
				result.append(error.toString());
			}
			result.append("] ");
		}
		result.append("} ");
		
		return result.toString();
	}

}
