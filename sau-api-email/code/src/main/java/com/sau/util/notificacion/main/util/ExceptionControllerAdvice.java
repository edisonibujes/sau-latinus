package com.sau.util.notificacion.main.util;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 
 * @author Fernando
 * Componente, RestControllerAdvice que permite manejar las excepciones
 */
@RestControllerAdvice
public class ExceptionControllerAdvice {
	
	
	@ExceptionHandler(CustomGenericException.class)
	public ResponseEntity<ErrorResponse> exceptionHandler(CustomGenericException ex) {
		ErrorResponse error = new ErrorResponse(ex.getErrCode(), ex.getErrMsg(),ex.getErrMsgDetail());		
		
		return ResponseEntity.status(ex.getErrCode()).body(error);		
	}


}
