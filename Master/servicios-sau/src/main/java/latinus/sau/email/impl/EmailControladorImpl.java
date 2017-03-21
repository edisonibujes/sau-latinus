/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.email.impl;

import java.io.File;
import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import latinus.sau.email.EmailControlador;
import latinus.sau.email.util.NotificacionAdjuntoRequest;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

/**
 *
 * @author Ricardo
 */
public class EmailControladorImpl implements EmailControlador {

    private JavaMailSender javaMailSender;
    private final String from = "info.sau@dinardap.gob.ec";
    private final String emailTemplate_1 = "<html><body><p><b>Estimado(a):</b> %s,<br>Para completar el proceso de registro en el Sistema de Autenticaci\\u00F3n \\u00DAnico SAU, debe abrir el enlace que se muestra a continuaci\\u00F3n:<br><a href='%s'>Enlace</a><br><br><b>IMPORTANTE</b>: Por favor recuerde que debe abrir el enlace y completar el proceso de registro hasta un periodo m\\u00E1ximo de <b>60 minutos</b>, desde la fecha en la que le lleg\\u00F3 este correo electr\\u00F3nico. Luego de ese periodo no podr\\u00E1 completar el proceso de registro y deber\\u00E1 acercarse a las ventanillas de atenci\\u00F3n para reiniciar el proceso. El formulario de Pre Registro Firmado por el Fedatario se encuentra adjunto en \\u00E9ste mensaje.<br><br>Atentamente.<br><b>Sistema de Autenticaci\\u00F3n \\u00DAnico SAU</b><br>Nota: Este mensaje fue enviado autom\\u00E1ticamente, por favor no lo responda.</p></body></html>";
    private final String emailTemplate_2 = "<html><body><p><b>Estimado(a):</b> %s,<br>Para completar el proceso de asignaci\\u00F3n de rol (Administrador Proveedores, Administrador Fedatario o Administrador Usuario) dentro del Sistema de Autenticaci\\u00F3n \\u00DAnico SAU, debe abrir el enlace que se muestra a continuaci\\u00F3n:<br><a href='%s'>Enlace</a><br><br><b>IMPORTANTE</b>: Por favor recuerde que debe abrir el enlace y adjuntar toda la documentaci\\u00F3n solicitada dentro del mismo para lo cual cuenta con un periodo m\\u00E1ximo de 5 d\\u00EDas, desde la fecha en la que le lleg\\u00F3 este correo electr\\u00F3nico. Luego de ese periodo no podr\\u00E1 completar el proceso de asignaci\\u00F3n de rol y deber\\u00E1 acercarse a las ventanillas de atenci\\u00F3n para reiniciar el proceso.<br><br>Atentamente.<br><b>Sistema de Autenticaci\\u00F3n \\u00DAnico SAU</b><br>Nota: Este mensaje fue enviado autom\\u00E1ticamente, por favor no lo responda.</p></body></html>";
    private final String emailTemplate_3 = "<html><body><p><b>Estimado(a):</b> %s,<br>Para completar el proceso de asignaci\\u00F3n de rol Fedatario dentro del Sistema de Autenticaci\\u00F3n \\u00DAnico SAU, debe abrir el enlace que se muestra a continuaci\\u00F3n:<br><a href='%s'>Enlace</a><br><br><b>IMPORTANTE</b>: Por favor recuerde que debe abrir el enlace y adjuntar toda la documentaci\\u00F3n solicitada dentro del mismo para lo cual cuenta con un periodo m\\u00E1ximo de 5 d\\u00EDas, desde la fecha en la que le lleg\\u00F3 este correo electr\\u00F3nico. Luego de ese periodo no podr\\u00E1 completar el proceso de asignaci\\u00F3n de rol Fedatario y deber\\u00E1 acercarse a las ventanillas de atenci\\u00F3n para reiniciar el proceso.<br><br>Atentamente.<br><b>Sistema de Autenticaci\\u00F3n \\u00DAnico SAU</b><br>Nota: Este mensaje fue enviado autom\\u00E1ticamente, por favor no lo responda.</p></body></html>";
    private final String DIRECTORY = "pdfs";

    public void setMailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public Boolean enviarNotificacion(NotificacionAdjuntoRequest request) {
        MimeMessage message = this.javaMailSender.createMimeMessage();
        try {
            message.setFrom(new InternetAddress(this.from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(request.getEmail()));
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setSubject("Dinardap Notificaci?n de Pre Registro");
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
            FileSystemResource file = new FileSystemResource(getDirectoryFilePath(request.getFile()));
            helper.addAttachment("PreRegistro.pdf", file);
            this.javaMailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private String getDirectoryFilePath(String uuid) {
        StringBuilder sb = new StringBuilder();
        sb.append(this.DIRECTORY).append(File.separator).append(uuid).append(".pdf");
        String path = sb.toString();
        return path;
    }

    public void sendMail(String from, String to, String subject, String msg) {
        //creating message  
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(msg);
        //sending message  
        javaMailSender.send(message);
    }

}
