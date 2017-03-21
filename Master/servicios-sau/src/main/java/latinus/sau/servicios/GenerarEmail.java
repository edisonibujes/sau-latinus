/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.servicios;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import latinus.sau.email.impl.MailMail;
import latinus.sau.email.util.NotificacionAdjuntoRequest;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.apache.log4j.Logger;

/**
 * REST Web Service
 *
 * @author Ricardo
 *
 */
@Path("email")
public class GenerarEmail {

    private static final Logger LOG = Logger.getLogger(GenerarEmail.class);

    public GenerarEmail() {
    }

    @GET
    public String getXml() {
        return "Hola Mundo Email";
    }

    @POST
    @Path("adjunto")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String adjunto(NotificacionAdjuntoRequest request) {
        try {
            Resource r = new ClassPathResource("applicationContext.xml");
            BeanFactory b = new XmlBeanFactory(r);
            MailMail m = (MailMail) b.getBean("mailMail");
            m.enviarNotificacion(request);
        } catch (Exception e) {
            return e.getMessage();
        }
        return "OK";
    }

}
