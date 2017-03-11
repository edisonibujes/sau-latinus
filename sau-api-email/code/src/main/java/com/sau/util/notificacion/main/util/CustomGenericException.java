package com.sau.util.notificacion.main.util;

/**
 * 
 * @author Fernando
 *	Clase que permite encapsular genericamente una excepción ocurrida en el API
 */
public class CustomGenericException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	/**
	 * Código de Error, usualmente se usa HttpStatusCode
	 */
	private int errCode;
	/**
	 * Mensaje de Error general
	 */
	private String errMsg;
	/**
	 * Detalle del mensaje de Error
	 */
	private String errMsgDetail;

	public int getErrCode() {
		return errCode;
	}

	public void setErrCode(int errCode) {
		this.errCode = errCode;
	}

	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}

	

	public CustomGenericException(int errCode, String errMsg, String errMsgDetail) {		
		this.errCode = errCode;
		this.errMsg = errMsg;
		this.errMsgDetail = errMsgDetail;
	}

	public String getErrMsgDetail() {
		return errMsgDetail;
	}

	public void setErrMsgDetail(String errMsgDetail) {
		this.errMsgDetail = errMsgDetail;
	}

}
