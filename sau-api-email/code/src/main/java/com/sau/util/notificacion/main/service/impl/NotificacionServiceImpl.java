package com.sau.util.notificacion.main.service.impl;

import java.io.File;



import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.sau.util.notificacion.main.request.NotificacionRequest;
import com.sau.util.notificacion.main.service.NotificacionService;

@Service
public class NotificacionServiceImpl implements NotificacionService {

	@Value("${pdf.source}")
	private String DIRECTORY;
	
	@Value("${spring.mail.username}")
	private String from;
	
	private static final Logger LOG = Logger.getLogger(NotificacionServiceImpl.class);
	public final String emailTemplate = "<html>"
			+ "<body>"
			+ "<p> <b>Estimado(a):</b> %s," 
			+ "<br>Para completar el proceso de registro en el Sistema de Autenticación Único SAU, debe abrir el enlace que se muestra a continuación:" 
			+ "<br><a href='%s'>Enlace</a><br>"
			+ "<b>IMPORTANTE</b>: Por favor recuerde que debe abrir el enlace y completar el proceso de registro hasta un periodo máximo de [XX] días, desde la fecha en la que "
			+ "le llegó este correo electrónico. Luego de ese periodo no podrá completar el proceso de registro y deberá acercarse a las ventanillas de atención para reiniciar el proceso. "
			+ "El formulario de Pre Registro Firmado por el Fedatario se encuentra adjunto en éste mensaje."
			+ "Atentamente.<br>Sistema de Autenticación Único SAU<br>Nota: Este mensaje fue enviado automáticamente, por favor no lo responda."
			+ "</p>"
			+ "</body>"
			+ "</html>";
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	@Async
	public void SendNotificacion(NotificacionRequest request) {
		LOG.info(request.toString());
		MimeMessage message = mailSender.createMimeMessage();
		
		try {
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(request.getEmail()));
		} catch (AddressException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (MessagingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	     // use the true flag to indicate you need a multipart message
	        MimeMessageHelper helper;
	        LOG.info("Creando E-mail con Template");
			try {
				helper = new MimeMessageHelper(message, true);
				//helper.setTo(new InternetAddress(request.getEmail()));
				helper.setSubject("Dinardap Notificación de Pre Registro");				
				// use the true flag to indicate the text included is HTML
				helper.setText(String.format(emailTemplate, request.getNombre(),request.getToken()), true);
						        		      
		        //FileSystemResource file = new FileSystemResource(new File("C:/Users/mijao03/Documents/PdfExamples/prueba1.pdf"));
				LOG.info("Insertando el adjunto :" + request.getFile());
		        FileSystemResource file = new FileSystemResource(getDirectoryFilePath(request.getFile()));
		        helper.addAttachment("PreRegistro.pdf", file);
		        LOG.info("Archivo adjuntado éxitosamente! procediendo al envío.");
		        mailSender.send(message);
		        LOG.info("Notificación enviada a:" + request.getEmail());
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				System.out.println(e.getCause() + " " + e.getMessage());
			}	     	      
	}
	
	private String getDirectoryFilePath(String uuid) {
        StringBuilder sb = new StringBuilder();
        sb.append(DIRECTORY).append(File.separator).append(uuid).append(".pdf");
        String path = sb.toString();
        return path;
    }

}
