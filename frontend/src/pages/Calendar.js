import React, { useEffect, useState, useRef } from 'react';
import '../styles/calendar.css';
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config/api";

export default function Calendar() {

  // Stato che contiene i film raggruppati per periodo di uscita
  const [releases, setReleases] = useState({});

  // Periodo attivo (questa settimana, prossima, ecc.)
  const [active, setActive] = useState('this');

  // Data selezionata manualmente dall’utente
  const [selectedDate, setSelectedDate] = useState(null);

  // Film filtrati in base alla data scelta
  const [dateFilteredFilms, setDateFilteredFilms] = useState([]);

  // Mostra/nasconde il date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Riferimento all’input di tipo date
  const dateInputRef = useRef(null);

  // Recupera le uscite dal backend al caricamento del componente
  useEffect(() => {
    fetch(`${API_BASE_URL}/releases`)
      .then((r) => r.json())
      .then(setReleases);
  }, []);

  // Etichette dei periodi mostrati all’utente
  const groups = {
    previous: 'Scorsa settimana',
    this: 'Questa settimana',
    week1: 'Tra 1 settimana',
    week2: 'Tra 2 settimane',
    week3: 'Tra 3 settimane'
  };

  // Gestisce la selezione manuale di una data
  function handleDateChange(e) {
    const date = e.target.value;
    setSelectedDate(date);

    if (date) {
      setActive(null);

      // Unisce tutti i film ed elimina i duplicati
      const allFilms = Array.from(
        new Map(
          Object.values(releases)
            .flat()
            .map((f) => [f.id, f])
        ).values()
      );

      // Filtra i film in base alla data di uscita
      const filtered = allFilms.filter((f) => f.releaseDate === date);
      setDateFilteredFilms(filtered);
    } else {
      setDateFilteredFilms([]);
      setActive('this');
    }
  }

  // Mostra o nasconde il selettore di data
  function handleChoosePeriod() {
    const newState = !showDatePicker;
    setShowDatePicker(newState);
    setSelectedDate(null);
    setActive(null);

    // Forza l’apertura del date picker (compatibilità browser)
    setTimeout(() => {
      if (newState && dateInputRef.current) {
        try {
          dateInputRef.current.showPicker();
        } catch {
          dateInputRef.current.focus();
        }
      }
    }, 60);
  }

  // Decide quali film mostrare in base alla selezione
  const filmsToShow = selectedDate
    ? dateFilteredFilms
    : releases[active] || [];

  return (
    <div className="container">
      <h2 className="section-title">Calendario Uscite</h2>

      <div className="calendar-controls">

        {Object.keys(groups).map((k) => (
          <div
            key={k}
            className={'choice ' + (active === k ? 'active' : '')}
            onClick={() => {
              setActive(k);
              setSelectedDate(null);
              setShowDatePicker(false);
            }}
          >
            {groups[k]}
          </div>
        ))}

        <button
          className={'choice period-button ' + (showDatePicker ? 'active' : '')}
          style={{ marginLeft: 12 }}
          onClick={handleChoosePeriod}
        >
          Scegli Periodo
        </button>

        {showDatePicker && (
          <div className="date-wrapper">
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate || ''}
              onChange={handleDateChange}
              className="choice date-input"
            />
          </div>
        )}
      </div>

      <div className="card-grid netflix-enter">
        {filmsToShow.length === 0 ? (
          <div style={{ color: '#cbd9ea', marginTop: 20 }}>
            Nessun film disponibile per la data selezionata.
          </div>
        ) : (
          filmsToShow.map((f, index) => (
            <Link key={f.id} to={`/film/${f.id}`} className="calendar-link">
              <div
                className="netflix-item"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <img
                  className="thumb"
                  src={`${API_BASE_URL}/images/` + f.thumbnail}
                  alt={f.title}
                />
                <div className="calendar-title">{f.title}</div>
                <div style={{ textAlign: 'center', color: '#cbd9ea' }}>
                  {f.releaseDate}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

// Questo componente mostra il calendario delle uscite.
// I dati arrivano dal backend tramite API REST, vengono filtrati per periodo o data scelta e visualizzati dinamicamente.
// Le immagini sono servite direttamente dal backend.