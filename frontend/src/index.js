import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Punto di ingresso dell'applicazione React
// Monta il componente principale App nel div con id "root"
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Questo è il file di avvio dell’app React: prende il componente principale e lo renderizza nel DOM