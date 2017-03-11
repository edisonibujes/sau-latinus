package com.sau.util.notificacion.main.request;

import org.hibernate.validator.constraints.Email;

public class NotificacionRequest {
	
	private String nombre;
	
	@Email
	private String email;
	
	private String file;
	
	private String token;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "NotificacionRequest [nombre=" + nombre + ", email=" + email + ", file=" + file + ", token=" + token
				+ "]";
	}
	
	
}
