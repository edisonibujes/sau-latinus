/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.pdf.util;

/**
 *
 * @author Ricardo
 */
public class NotificacionResponse {
    private String fileName;

    public String getFileName() {
        return this.fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public NotificacionResponse(String fileName) {
        this.fileName = fileName;
    }

    public NotificacionResponse() {
    }
}
