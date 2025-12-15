import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/NewsArticle.css";
import API_BASE_URL from "../config/api";

export default function NewsArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/news/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!article) return <p className="loading">Caricamento...</p>;

  const imageUrl = `${API_BASE_URL}/images/${article.cover}`;

  return (
    <div className="article-page">
      
      {/* HERO */}
      <div className="hero" style={{ backgroundImage: `url(${imageUrl})` }}>
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
