/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.email.impl;

import java.io.File;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import latinus.sau.email.util.NotificacionAdjuntoRequest;
import org.apache.log4j.Logger;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

/**
 *
 * @author Ricardo
 */
public class MailMail {

    private JavaMailSender mailSender;
    private final String from = "notificacion@latinus.net";
    private final String emailTemplate_1 = "<html><body><p><b>Estimado(a):</b> %s,<br>Para completar el proceso de registro en el Sistema de Autenticación Único SAU, debe abrir el enlace que se muestra a continuación:<br><a href='%s'>Enlace</a><br><br><b>IMPORTANTE</b>: Por favor recuerde que debe abrir el enlace y completar el proceso de registro hasta un periodo máximo de <b>60 minutos</b>, desde la fecha en la que le llegue este correo electrónico. Luego de ese periodo no podrá completar el proceso de registro y deberá acercarse a las ventanillas de atención para reiniciar el proceso. El formulario de Pre Registro Firmado por el Fedatario se encuentra adjunto en este mensaje.<br><br>Atentamente.<br><b>Sistema de Autenticación Único SAU</b><br>Nota: Este mensaje fue enviado automáticamente, por favor no lo responda.</p></body></html>";
    private final String emailTemplate_2 = "<html><body><p><b>Estimado(a):</b> %s,<br>Para completar el proceso de asignaci\\u00F3n de rol (Administrador Proveedores, Administrador Fedatario o Administrador Usuario) dentro del Sistema de Autenticaci\\u00F3n \\u00DAnico SAU, debe abrir el enlace que se muestra a continuaci\\u00F3n:<br><a href='%s'>Enlace</a><br><br><b>IMPORTANTE</b>: Por favor recuerde que debe abrir el enlace y adjuntar toda la documentaci\\u00F3n solicitada dentro del mismo para lo cual cuenta con un periodo m\\u00E1ximo de 5 d\\u00EDas, desde la fecha en la que le lleg\\u00F3 este correo electr\\u00F3nico. Luego de ese periodo no podr\\u00E1 completar el proceso de asignaci\\u00F3n de rol y deber\\u00E1 acercarse a las ventanillas de atenci\\u00F3n para reiniciar el proceso.<br><br>Atentamente.<br><b>Sistema de Autenticaci\\u00F3n \\u00DAnico SAU</b><br>Nota: Este mensaje fue enviado autom\\u00E1ticamente, por favor no lo responda.</p></body></html>";
    private final String emailTemplate_3 = "<html><body><p><b>Estimado(a):</b> %s,<br>Para completar el proceso de asignaci\\u00F3n de rol Fedatario dentro del Sistema de Autenticaci\\u00F3n \\u00DAnico SAU, debe abrir el enlace que se muestra a continuaci\\u00F3n:<br><a href='%s'>Enlace</a><br><br><b>IMPORTANTE</b>: Por favor recuerde que debe abrir el enlace y adjuntar toda la documentaci\\u00F3n solicitada dentro del mismo para lo cual cuenta con un periodo m\\u00E1ximo de 5 d\\u00EDas, desde la fecha en la que le lleg\\u00F3 este correo electr\\u00F3nico. Luego de ese periodo no podr\\u00E1 completar el proceso de asignaci\\u00F3n de rol Fedatario y deber\\u00E1 acercarse a las ventanillas de atenci\\u00F3n para reiniciar el proceso.<br><br>Atentamente.<br><b>Sistema de Autenticaci\\u00F3n \\u00DAnico SAU</b><br>Nota: Este mensaje fue enviado autom\\u00E1ticamente, por favor no lo responda.</p></body></html>";
    private final String DIRECTORY = "pdfs";
    private static final Logger LOG = Logger.getLogger(MailMail.class);

    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(final String from, final String to, final String subject, final String msg) {
        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
                mimeMessage.setFrom(new InternetAddress(from));
                mimeMessage.setSubject(subject);
                mimeMessage.setText(msg);
            }
        };
        mailSender.send(messagePreparator);
    }

    public Boolean enviarNotificacion(NotificacionAdjuntoRequest request) throws MessagingException {
        LOG.info("enviarNotificacion 1");
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(new InternetAddress(request.getEmail()));
        LOG.info("enviarNotificacion 2");
        helper.setSubject("Dinardap Notificación de Pre Registro");
        switch (request.getTipoSolicitud()) {
            case "1":
                helper.setText(String.format(this.emailTemplate_1, new Object[]{request.getNombre(), request.getToken()}), true);
                break;
            case "2":
                helper.setText(String.format(this.emailTemplate_2, new Object[]{request.getNombre(), request.getToken()}), true);
                break;
            case "3":
                helper.setText(String.format(this.emailTemplate_3, new Object[]{request.getNombre(), request.getToken()}), true);
        }
        LOG.info("enviarNotificacion 3");
        FileSystemResource file = new FileSystemResource(getDirectoryFilePath(request.getFile()));
        LOG.info("enviarNotificacion 4");
        helper.addAttachment("PreRegistro.pdf", file);
        LOG.info("enviarNotificacion 5");
        this.mailSender.send(message);
        System.out.println("enviarNotificacion 6");
        return true;
    }

    private String getDirectoryFilePath(String uuid) {
        StringBuilder sb = new StringBuilder();
        sb.append(this.DIRECTORY).append(File.separator).append(uuid).append(".pdf");
//        String path="C:\\apache-tomcat-7.0.59\\bin\\pdfs\\" + uuid + ".pdf";
        String path = sb.toString();
        return path;
    }
}
