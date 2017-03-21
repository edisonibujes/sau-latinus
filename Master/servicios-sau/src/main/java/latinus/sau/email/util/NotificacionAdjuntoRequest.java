package latinus.sau.email.util;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement       
public class NotificacionAdjuntoRequest {

    private String nombre;
    private String email;
    private String file;
    private String token;
    private String tipoSolicitud;

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFile() {
        return this.file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTipoSolicitud() {
        return this.tipoSolicitud;
    }

    public void setTipoSolicitud(String tipoSolicitud) {
        this.tipoSolicitud = tipoSolicitud;
    }

    public String toString() {
        return "NotificacionRequest [nombre=" + this.nombre + ", email=" + this.email + ", file=" + this.file + ", token=" + this.token + ", tipoSolicitud=" + this.tipoSolicitud + "]";
    }
    
}
