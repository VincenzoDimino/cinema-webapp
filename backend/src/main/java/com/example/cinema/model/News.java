package com.example.cinema.model;

/**
 * Simple POJO representing a News article.
 */
public class News {
    public Long id;
    public String title;
    public String thumbnail;
    public String content;
    public String date;
    public String cover;

    public News() {}

    public News(Long id, String title, String thumbnail, String content, String date, String cover) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.content = content;
        this.date = date;
        this.cover = cover;
    }
}
