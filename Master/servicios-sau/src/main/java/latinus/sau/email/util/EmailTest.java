/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.email.util;

import latinus.sau.email.impl.MailMail;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 *
 * @author Ricardo
 */
public class EmailTest {

    public static void main(String[] args) {
        simpleEmail();
    }
    
    public static boolean testAdjunto(){
        Resource r = new ClassPathResource("applicationContext.xml");
        BeanFactory b = new XmlBeanFactory(r);
        MailMail m = (MailMail) b.getBean("mailMail");
        NotificacionAdjuntoRequest notificacionAdjuntoRequest = new NotificacionAdjuntoRequest();
        notificacionAdjuntoRequest.setEmail("edison.ibujes@gmail.com");
        notificacionAdjuntoRequest.setFile("32c812d5-5b11-4fc8-90ca-03be18ea2ded");
        notificacionAdjuntoRequest.setNombre("Edison Ibujes");
        notificacionAdjuntoRequest.setTipoSolicitud("1");
        notificacionAdjuntoRequest.setToken("001");
//        m.enviarNotificacion(notificacionAdjuntoRequest);
        System.out.println("success");
        return false;
    }
    
    public static boolean simpleEmail(){
        Resource r = new ClassPathResource("applicationContext.xml");
        BeanFactory b = new XmlBeanFactory(r);
        MailMail m = (MailMail) b.getBean("mailMail");
        String sender = "notificacion@latinus.net";//write here sender gmail id  
        String receiver = "edison.ibujes@gmail.com";//write here receiver id  
        m.sendMail(sender, receiver, "hi", "welcome");
        System.out.println("success");
        return true;
    }
    
}
