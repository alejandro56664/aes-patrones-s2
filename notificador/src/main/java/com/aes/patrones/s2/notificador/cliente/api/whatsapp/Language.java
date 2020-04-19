package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"policy",
	"code"
})
@Component
public class Language {

	@JsonProperty("policy")
	private String policy;
	@JsonProperty("code")
	private String code;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<>();

	public Language() {
		super();
	}

	public Language(String policy, String code, Map<String, Object> additionalProperties) {
		super();
		this.policy = policy;
		this.code = code;
		this.additionalProperties = additionalProperties;
	}

	@JsonProperty("policy")
	public String getPolicy() {
		return policy;
	}

	@JsonProperty("policy")
	public void setPolicy(String policy) {
		this.policy = policy;
	}

	@JsonProperty("code")
	public String getCode() {
		return code;
	}

	@JsonProperty("code")
	public void setCode(String code) {
		this.code = code;
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
		return "Language {policy=" + policy + ", code=" + code + ", additionalProperties=" + additionalProperties + "}";
	}

}
