package com.sau.util.notificacion.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SauUtilApiNotificacionApplication {

	public static void main(String[] args) {
		SpringApplication.run(SauUtilApiNotificacionApplication.class, args);
	}
}
