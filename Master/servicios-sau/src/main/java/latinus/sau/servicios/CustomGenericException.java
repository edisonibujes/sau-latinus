/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.servicios;

/**
 *
 * @author Ricardo
 */
public class CustomGenericException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private int errCode;
    private String errMsg;
    private String errMsgDetail;

    public int getErrCode() {
        return this.errCode;
    }

    public void setErrCode(int errCode) {
        this.errCode = errCode;
    }

    public String getErrMsg() {
        return this.errMsg;
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
        return this.errMsgDetail;
    }

    public void setErrMsgDetail(String errMsgDetail) {
        this.errMsgDetail = errMsgDetail;
    }
}
