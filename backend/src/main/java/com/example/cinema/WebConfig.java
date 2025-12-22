package com.example.cinema;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

 // Configurazione MVC per la gestione delle risorse statiche.

@Configuration
public class WebConfig implements WebMvcConfigurer {

  
     // Mappa l'URL /images/** alla cartella
     // resources/static/images.
     
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry
            .addResourceHandler("/images/**")
            .addResourceLocations("classpath:/static/images/");
    }
}

/**
 * CQuesta classe configura Spring MVC per servire le immagini statiche.
 * Tutte le richieste che iniziano con /images/ vengono reindirizzate alla cartella static/images del progetto.
 */
