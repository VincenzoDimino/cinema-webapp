import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/news.css";
import API_BASE_URL from "../config/api";

export default function News() {

  const navigate = useNavigate();

  // Lista delle news recuperate dal backend
  const [articles, setArticles] = useState([]);

  // Stato di caricamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Recupera le news dal backend
    fetch(`${API_BASE_URL}/news`)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setArticles(data || []);
      })
      .catch(() => setArticles([]))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    // Evita aggiornamenti di stato su componente smontato
    return () => (mounted = false);
  }, []);

  return (
    <div className="container">
      <h2 className="section-title">News</h2>

      {loading ? (
        <div style={{ color: "#cbd9ea", textAlign: "center", marginTop: 20 }}>
          Caricamento...
        </div>
      ) : (
        <div className="news-list netflix-enter">
          {articles.length === 0 ? (
            <div style={{ color: "#cbd9ea", textAlign: "center" }}>
              Nessuna news disponibile.
            </div>
          ) : (
            articles.map((a, i) => {
              const img = `${API_BASE_URL}/images/${a.thumbnail}`;

              return (
                <article
                  key={a.id}
                  className="news-item netflix-item"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <button
                    className="news-thumb-wrap"
                    onClick={() => navigate(`/news/${a.id}`)}
                  >
                    <img
                      className="news-thumb"
                      src={img}
                      alt={a.title}
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-news.jpg";
                      }}
                    />
                  </button>

                  <div className="news-content">
                    <div className="news-meta">MOVIE NEWS</div>

                    <h3
                      className="news-title"
                      onClick={() => navigate(`/news/${a.id}`)}
                    >
                      {a.title}
                    </h3>

                    <p className="news-preview">
                      {a.content
                        ? a.content.length > 220
                          ? a.content.substring(0, 220) + "..."
                          : a.content
                        : ""}
                    </p>

                    <div className="news-actions">
                      <button
                        className="ghost-btn"
                        onClick={() => navigate(`/news/${a.id}`)}
                      >
                        Leggi
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// Questo componente mostra la lista delle news.
// I dati vengono recuperati dal backend tramite API REST
// e ogni articolo rimanda alla pagina di dettaglio.

// Un componente è montato quando è visibile a schermo e smontato quando si cambia pagina.
// Controllo lo stato “mounted” per evitare aggiornamenti asincroni su componenti non più presenti.