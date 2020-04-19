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
	"default"
})
public class LocalizableParam {

	@JsonProperty("default")
	private String ldefault;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<>();

	public LocalizableParam() {
		super();
		
	}

	public LocalizableParam(String ldefault, Map<String, Object> additionalProperties) {
		super();
		this.ldefault = ldefault;
		this.additionalProperties = additionalProperties;
	}

	@JsonProperty("default")
	public String getDefault() {
		return ldefault;
	}

	@JsonProperty("default")
	public void setDefault(String ldefault) {
		this.ldefault = ldefault;
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
		return "LocalizableParam {_default=" + ldefault + ", additionalProperties=" + additionalProperties + "}";
	}

}
