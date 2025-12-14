import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/news.css";

export default function News() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("http://localhost:8080/api/news")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setArticles(data || []);
      })
      .catch(() => setArticles([]))
      .finally(() => {
        if (mounted) setLoading(false);
      });

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
              const img = `http://localhost:8080/api/images/${a.thumbnail}`;

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
