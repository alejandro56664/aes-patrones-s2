/**
 * 
 */
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
	"code",
	"title",
	"details"
})
public class WhatsAppErrors {

	@JsonProperty("code")
	private Integer code;
	@JsonProperty("title")
	private String title;
	@JsonProperty("details")
	private String details;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<>();

	@JsonProperty("code")
	public Integer getCode() {
		return code;
	}

	@JsonProperty("code")
	public void setCode(Integer code) {
		this.code = code;
	}

	@JsonProperty("title")
	public String getTitle() {
		return title;
	}

	@JsonProperty("title")
	public void setTitle(String title) {
		this.title = title;
	}

	@JsonProperty("details")
	public String getDetails() {
		return details;
	}

	@JsonProperty("details")
	public void setDetails(String details) {
		this.details = details;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

	public WhatsAppErrors(Integer code, String title, String details) {
		super();
		this.code = code;
		this.title = title;
		this.details = details;
	}

	public WhatsAppErrors(Integer code, String title) {
		super();
		this.code = code;
		this.title = title;
	}

	public WhatsAppErrors() {
		super();
		
	}
	
	@Override
	public String toString() {
		StringBuilder result = new StringBuilder();
		result.append("WhatsAppErrors { ");
		result.append("code: "+code);
		result.append("title: "+title);
		result.append("details: "+details);
		if(this.additionalProperties != null) {
			result.append("additionalProperties {");
			additionalProperties.forEach((k,v) -> result.append(k+": "+v)
			);
			
			result.append("} ");
		}
		result.append("} ");
		
		return result.toString();
	}

}
