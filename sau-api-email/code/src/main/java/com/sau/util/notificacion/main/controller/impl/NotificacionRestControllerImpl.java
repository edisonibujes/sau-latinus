package com.sau.util.notificacion.main.controller.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sau.util.notificacion.main.controller.NotificacionRestController;
import com.sau.util.notificacion.main.request.NotificacionRequest;
import com.sau.util.notificacion.main.service.NotificacionService;

/**
 * 
 * @author Fernando
 * Clase que implementa el controlador Rest del envío de Notificacion Vía E-mail
 */
@RestController
@RequestMapping("/notificacion/email")
public class NotificacionRestControllerImpl implements NotificacionRestController {

	private static final Logger LOG = Logger.getLogger(NotificacionRestControllerImpl.class);
	
	@Autowired
	private NotificacionService notificacionService;
	
	@Override
	@PostMapping
	public void SendNotificacion(@RequestBody @Validated NotificacionRequest request) {
		// TODO Auto-generated method stub
		this.notificacionService.SendNotificacion(request);		
	}

}
