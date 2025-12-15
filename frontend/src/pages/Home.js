import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import clapBase from '../assets/clap_base.png';
import clapTop from '../assets/clap_top.png';
import API_BASE_URL from "../config/api";

/* 🔴 FLAG IN MEMORIA (resetta con refresh) */
let splashAlreadyShown = false;

export default function Home() {
  const [data, setData] = useState({ drammatico: [], sentimentale: [] });
  const [selected, setSelected] = useState('drammatico');
  const [animKey, setAnimKey] = useState(0);
  const [showSplash, setShowSplash] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    /* ================= FETCH DATI ================= */
    fetch(`${API_BASE_URL}/genres`)
      .then(r => r.json())
      .then(setData);

    /* ================= SPLASH ================= */
    if (!splashAlreadyShown) {
      splashAlreadyShown = true;
      setShowSplash(true);

      const t = setTimeout(() => {
        setShowSplash(false);
      }, 4200);

      return () => clearTimeout(t);
    }
  }, []);

  function changeGenre(g) {
    if (g === selected) return;
    setSelected(g);
    setAnimKey(prev => prev + 1);
  }

  const films = data[selected] || [];

  return (
    <>
      {/* ================= SPLASH ================= */}
      {showSplash && (
        <div className="splash-overlay">
          <div className="splash-content">
            <img
              src={logo}
              className="splash-logo"
              alt="Cinema Web App"
            />

            <div className="clap-wrapper">
              <img src={clapBase} className="clap-base" alt="" />
              <img src={clapTop} className="clap-top" alt="" />
            </div>
          </div>
        </div>
      )}

      {/* ================= HOME ================= */}
      <div className="container">
        <h2 className="section-title">Genere</h2>

        <div className="genre-tabs">
          <div
            className={'tab ' + (selected === 'drammatico' ? 'active' : '')}
            onClick={() => changeGenre('drammatico')}
          >
            Drammatico
          </div>

          <div
            className={'tab ' + (selected === 'sentimentale' ? 'active' : '')}
            onClick={() => changeGenre('sentimentale')}
          >
            Sentimentale
          </div>
        </div>

        <div key={animKey} className="card-grid netflix-enter">
          {films.slice(0, 3).map((f, i) => (
            <div
              className="film-card netflix-item"
              style={{ animationDelay: `${i * 0.12}s` }}
              key={f.id}
            >
              <img
                className="thumb"
                alt={f.title}
                src={`${API_BASE_URL}/images/` + f.thumbnail}
                onClick={() => navigate('/film/' + f.id)}
              />
              <div className="card-title">
                {f.title} ({f.year})
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
