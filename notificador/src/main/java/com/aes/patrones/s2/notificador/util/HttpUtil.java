/**
 * 
 */
package com.aes.patrones.s2.notificador.util;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public class HttpUtil {
	
	private static final Logger log = LoggerFactory.getLogger(HttpUtil.class);
	
	 private HttpUtil() {
		    throw new IllegalStateException("Utility class");
		  }
	
	protected static final HttpHeaders JSON_HEADER;
	
	static{
		JSON_HEADER = new HttpHeaders();
		JSON_HEADER.setContentType(MediaType.APPLICATION_JSON);
	}

	public static HttpEntity<String> transformarJsonEntity(String objetoJson){
		return new HttpEntity<>(objetoJson ,JSON_HEADER);
	}
	
	public static void desactivarSSL() {
		TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            	return new X509Certificate[0];
            }
            public void checkClientTrusted(X509Certificate[] certs, String authType) throws CertificateException {
            	if( certs == null || authType == null) throw new CertificateException("lista de certificados y authTyoe no pueden ser null");
            	
            }
            public void checkServerTrusted(X509Certificate[] certs, String authType) throws CertificateException {
            	if( certs == null || authType == null) throw new CertificateException("lista de certificados y authTyoe no pueden ser null");
            }
	        }
	    };
	
	    // Install the all-trusting trust manager
	    SSLContext sc;
		try {
			sc = SSLContext.getInstance("TLSv1.2");
			sc.init(null, trustAllCerts, new java.security.SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
		} catch (KeyManagementException | NoSuchAlgorithmException e) {
			log.error("Http Util ", e );
		} 
	   
	   // Create all-trusting host name verifier
	    HostnameVerifier allHostsValid = new HostnameVerifier() {
	        public boolean verify(String hostname, SSLSession session) {
	            return hostname != null && session != null;
	        }
	    };
	
	    // Install the all-trusting host verifier
	    HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
	}
}
