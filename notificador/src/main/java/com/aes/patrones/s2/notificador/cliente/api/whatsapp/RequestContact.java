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
"blocking",
"contacts",
"force_check"
})
public class RequestContact {

@JsonProperty("blocking")
private String blocking;
@JsonProperty("contacts")
private List<String> contacts = null;
@JsonProperty("force_check")
private Boolean forceCheck;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("blocking")
public String getBlocking() {
return blocking;
}

@JsonProperty("blocking")
public void setBlocking(String blocking) {
this.blocking = blocking;
}

@JsonProperty("contacts")
public List<String> getContacts() {
return contacts;
}

@JsonProperty("contacts")
public void setContacts(List<String> contacts) {
this.contacts = contacts;
}

@JsonProperty("force_check")
public Boolean getForceCheck() {
return forceCheck;
}

@JsonProperty("force_check")
public void setForceCheck(Boolean forceCheck) {
this.forceCheck = forceCheck;
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
	return "RequestContact [blocking=" + blocking + ", contacts=" + contacts + ", forceCheck=" + forceCheck + "]";
}

}