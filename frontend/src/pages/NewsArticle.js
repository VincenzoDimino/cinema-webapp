import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/NewsArticle.css";
import API_BASE_URL from "../config/api";

export default function NewsArticle() {

  // ID dell’articolo letto dall’URL
  const { id } = useParams();

  // Navigazione programmatica
  const navigate = useNavigate();

  // Stato che contiene l’articolo selezionato
  const [article, setArticle] = useState(null);

  // Recupera l’articolo dal backend in base all’ID
  useEffect(() => {
    fetch(`${API_BASE_URL}/news/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Stato di caricamento
  if (!article) return <p className="loading">Caricamento...</p>;

  // URL dell’immagine di copertina
  const imageUrl = `${API_BASE_URL}/images/${article.cover}`;

  return (
    <div className="article-page">

      {/* HERO */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="hero-overlay"></div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Torna indietro
        </button>
      </div>

      {/* CONTENUTO */}
      <div className="article-content fade-in">
        <h1 className="article-title">{article.title}</h1>

        {article.content.split("\n").map((p, i) => (
          <p key={i} className="article-paragraph">{p}</p>
        ))}

        <div className="article-date">
          Pubblicato: {article.date}
        </div>
      </div>

    </div>
  );
}

// Questo componente mostra il dettaglio di una news.
// L’articolo viene recuperato dal backend tramite ID
// e visualizzato con immagine di copertina e contenuto testuale.
