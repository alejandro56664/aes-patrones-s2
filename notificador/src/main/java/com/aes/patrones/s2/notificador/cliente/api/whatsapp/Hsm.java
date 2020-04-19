package com.aes.patrones.s2.notificador.cliente.api.whatsapp;

import java.util.ArrayList;
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
	"namespace",
	"element_name",
	"language",
	"localizable_params"
})
public class Hsm {

	@JsonProperty("namespace")
	private String namespace;
	@JsonProperty("element_name")
	private String elementName;
	@JsonProperty("language")
	private Language language;
	@JsonProperty("localizable_params")
	private List<LocalizableParam> localizableParams = new ArrayList<>();
	
	@JsonProperty("localizable_params")
	public List<LocalizableParam> getLocalizableParams() {
		return localizableParams;
	}
	@JsonProperty("localizable_params")
	public void setLocalizableParams(List<LocalizableParam> localizableParams) {
		this.localizableParams = localizableParams;
	}

	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<>();

	public Hsm() {
		super();
	}

	public Hsm(String namespace, String elementName, Language language, List<LocalizableParam> localizableParams,
			Map<String, Object> additionalProperties) {
		super();
		this.namespace = namespace;
		this.elementName = elementName;
		this.language = language;
		this.localizableParams = localizableParams;
		this.additionalProperties = additionalProperties;
	}

	@JsonProperty("namespace")
	public String getNamespace() {
		return namespace;
	}

	@JsonProperty("namespace")
	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}

	@JsonProperty("element_name")
	public String getElementName() {
		return elementName;
	}

	@JsonProperty("element_name")
	public void setElementName(String elementName) {
		this.elementName = elementName;
	}

	@JsonProperty("language")
	public Language getLanguage() {
		return language;
	}

	@JsonProperty("language")
	public void setLanguage(Language language) {
		this.language = language;
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
		return "Hsm {namespace=" + namespace + ", elementName=" + elementName + ", language=" + language.toString()
				+ ", localizableParams=" + localizableParams.toString() + ", additionalProperties=" + additionalProperties + "}";
	}

}
