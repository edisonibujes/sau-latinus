package com.sau.util.notificacion.main.util;

/**
 * 
 * @author Fernando
 * Clase que encapsula la respuesta enviada hacia el Cliente cuando ocurre una excepcion con status, error y detalle del error.
 */
public class ErrorResponse {

	private int status;
	private String error;
	private String message;
	
	public ErrorResponse(int status, String error, String detail) {
		this.setStatus(status);
		this.setError(error);
		this.setMessage(detail);
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	}
