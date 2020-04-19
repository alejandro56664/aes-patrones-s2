package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"input",
	"status",
	"wa_id"
})
public class Contact {

	@JsonProperty("input")
	private String input;
	@JsonProperty("status")
	private String status;
	@JsonProperty("wa_id")
	private String waId;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("input")
	public String getInput() {
		return input;
	}

	@JsonProperty("input")
	public void setInput(String input) {
		this.input = input;
	}

	@JsonProperty("status")
	public String getStatus() {
		return status;
	}

	@JsonProperty("status")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonProperty("wa_id")
	public String getWaId() {
		return waId;
	}

	@JsonProperty("wa_id")
	public void setWaId(String waId) {
		this.waId = waId;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

}