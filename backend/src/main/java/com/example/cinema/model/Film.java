package com.example.cinema.model;

/**
 * Simple POJO representing a Film.
 * Public fields used for brevity (serializable by Jackson).
 */
public class Film {
    public Long id;
    public String title;
    public int year;
    public String country;
    public String director;
    public String genre;
    public String thumbnail;
    public String screenshot;
    public String plot;
    public String releaseDate;

    public Film() {}

    public Film(Long id, String title, int year, String country, String director, String genre, String thumbnail, String screenshot, String plot, String releaseDate) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.country = country;
        this.director = director;
        this.genre = genre;
        this.thumbnail = thumbnail;
        this.screenshot = screenshot;
        this.plot = plot;
        this.releaseDate = releaseDate;
    }
}
