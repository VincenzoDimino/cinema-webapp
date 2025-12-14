import React, { useEffect, useState, useRef } from 'react';
import '../styles/calendar.css';
import { Link } from 'react-router-dom';

export default function Calendar() {
  const [releases, setReleases] = useState({});
  const [active, setActive] = useState('this');
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilteredFilms, setDateFilteredFilms] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateInputRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/releases')
      .then((r) => r.json())
      .then(setReleases);
  }, []);

  const groups = {
    previous: 'Scorsa settimana',
    this: 'Questa settimana',
    week1: 'Tra 1 settimana',
    week2: 'Tra 2 settimane',
    week3: 'Tra 3 settimane'
  };

  function handleDateChange(e) {
    const date = e.target.value;
    setSelectedDate(date);

    if (date) {
      setActive(null);

      const allFilms = Array.from(
        new Map(
          Object.values(releases)
            .flat()
            .map((f) => [f.id, f])
        ).values()
      );

      const filtered = allFilms.filter((f) => f.releaseDate === date);
      setDateFilteredFilms(filtered);
    } else {
      setDateFilteredFilms([]);
      setActive('this');
    }
  }

  function handleChoosePeriod() {
    const newState = !showDatePicker;
    setShowDatePicker(newState);
    setSelectedDate(null);
    setActive(null);

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

  const filmsToShow = selectedDate ? dateFilteredFilms : releases[active] || [];

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
                  src={'http://localhost:8080/api/images/' + f.thumbnail}
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
