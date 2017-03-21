/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.email;

import latinus.sau.email.util.NotificacionAdjuntoRequest;

/**
 *
 * @author Ricardo
 */
public interface EmailControlador {
    
    public Boolean enviarNotificacion(NotificacionAdjuntoRequest request);
 
}
