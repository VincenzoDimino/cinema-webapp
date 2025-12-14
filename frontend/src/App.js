import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import News from './pages/News';
import FilmDetail from './pages/FilmDetail';
import NewsArticle from './pages/NewsArticle';
import './styles/global.css';

/**
 * App component with React Router routes.
 * Navigation links use <Link> for client-side routing.
 */
export default function App(){
  return (
    <BrowserRouter>
      <div className='app'>
        <header className='topbar'>
          <Link to="/"><img src={'http://localhost:8080/api/images/logo.png'} className='logo' alt='logo'/></Link>
          <nav>
            <Link className='navbtn' to="/">Home</Link>
            <Link className='navbtn' to="/calendar">Calendario Uscite</Link>
            <Link className='navbtn' to="/news">News</Link>
          </nav>
        </header>
        <main className='content'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/news/:id" element={<NewsArticle/>}/>
            <Route path="/film/:id" element={<FilmDetail/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
