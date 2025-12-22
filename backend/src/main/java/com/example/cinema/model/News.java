package com.example.cinema.model;

/**
 * Modello che rappresenta una News.
 * I dati sono gestiti in memoria, senza database.
 */
public class News {

    public Long id;
    public String title;
    public String thumbnail;
    public String content;
    public String date;
    public String cover;

    // Costruttore vuoto richiesto dalla libreria Jackson
    // per la serializzazione/deserializzazione JSON.
    public News() {}

    // Costruttore completo per creare manualmente le news
    // nel backend senza usare un database.
    public News(
            Long id,
            String title,
            String thumbnail,
            String content,
            String date,
            String cover
    ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.content = content;
        this.date = date;
        this.cover = cover;
    }
}