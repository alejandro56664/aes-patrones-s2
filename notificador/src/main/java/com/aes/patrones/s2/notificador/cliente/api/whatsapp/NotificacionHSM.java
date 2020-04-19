package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Async;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"to",
	"type",
	"hsm"
})
@Async
public class NotificacionHSM {

	@JsonProperty("to")
	private String to;
	@JsonProperty("type")
	private String type;
	@JsonProperty("hsm")
	private Hsm hsm;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<>();

	public NotificacionHSM() {
		super();
	}

	public NotificacionHSM(String to, String type, Hsm hsm, Map<String, Object> additionalProperties) {
		super();
		this.to = to;
		this.type = type;
		this.hsm = hsm;
		this.additionalProperties = additionalProperties;
	}

	@JsonProperty("to")
	public String getTo() {
		return to;
	}

	@JsonProperty("to")
	public void setTo(String to) {
		this.to = to;
	}

	@JsonProperty("type")
	public String getType() {
		return type;
	}

	@JsonProperty("type")
	public void setType(String type) {
		this.type = type;
	}

	@JsonProperty("hsm")
	public Hsm getHsm() {
		return hsm;
	}

	@JsonProperty("hsm")
	public void setHsm(Hsm hsm) {
		this.hsm = hsm;
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
		return "NotificacionHSM {to=" + to + ", type=" + type + ", hsm=" + hsm.toString() + ", additionalProperties="
				+ additionalProperties + "}";
	}

}
