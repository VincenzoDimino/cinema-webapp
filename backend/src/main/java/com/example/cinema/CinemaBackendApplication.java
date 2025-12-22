package com.example.cinema;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

 // Classe principale dell'applicazione Spring Boot.
 
@SpringBootApplication
public class CinemaBackendApplication {

     // Punto di avvio dell'applicazione.
    
    public static void main(String[] args) {

        // Avvia il backend Spring Boot
        SpringApplication.run(CinemaBackendApplication.class, args);
    }
}

/**
 * «Questa è la classe di avvio del progetto.
 * L’annotazione @SpringBootApplication inizializza Spring e avvia il server.»
 */