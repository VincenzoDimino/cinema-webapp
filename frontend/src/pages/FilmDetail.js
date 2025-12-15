import React, { useEffect, useState } from 'react';
import '../styles/film.css';
import { useParams } from 'react-router-dom';
import API_BASE_URL from "../config/api";

export default function FilmDetail() {

  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/films/` + id)
      .then(r => r.json())
      .then(setFilm);
  }, [id]);

  if (!film) return <div className="container">Caricamento...</div>;

  return (
    <div className="container film-page">   {/* fade-in page */}

      {/* ------- HERO CON SFONDO BLUR -------- */}
      <div 
        className="film-hero"
        style={{ "--bg": `url(${API_BASE_URL}/images/${film.screenshot})` }}
      >

        <div className="film-hero-content">

          {/* POSTER PICCOLO A SINISTRA */}
          <img
            className="film-poster"
            src={`${API_BASE_URL}/images/${film.thumbnail}`}
            alt="poster"
          />

          {/* INFO PRINCIPALI */}
          <div className="film-info">
            <h1 className="film-title">{film.title}</h1>
            <div className="film-meta">
              {film.year} • {film.country} • Regia: {film.director}
            </div>
          </div>

        </div>
      </div>

      {/* ------- RIQUADRO TRAMA -------- */}
      <div className="film-detail">
        <p className="film-plot">{film.plot}</p>
      </div>

    </div>
  );
}
