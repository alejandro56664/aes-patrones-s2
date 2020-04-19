package com.aes.patrones.s2.notificador.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.aes.patrones.s2.notificador.dominio.Notificacion;
import com.aes.patrones.s2.notificador.servicio.NotificacionServicio;

@Controller
public class NotificacionController  {
    
    @Autowired
    private NotificacionServicio notificacion;


    @RequestMapping(value = "/api/v1/notificacion/enviar",
	        produces = { "application/json" }, 
	        method = RequestMethod.POST)
    public ResponseEntity<?> postNotificacion(@Validated @RequestBody Notificacion body) {

        	boolean ok = notificacion.enviar(body);
        	
        	if(ok) {
        		return new ResponseEntity<>( HttpStatus.CREATED);
        	} else {
        		return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        	}

    	
    }
}
