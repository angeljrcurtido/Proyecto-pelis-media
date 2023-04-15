import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav>
      <div className="nav-header">
        <h2>ProyectMedia</h2>

        <button className="nav-toggle" onClick={toggleNav}>
          {isNavOpen ? <span className='close-icon'>&#10005;</span> : <span className='menu-icon'>&#9776;</span>}
        </button>
      </div>

      <ul className={`navegador1 ${isNavOpen ? 'open' : ''}`}>
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/series">Series</Link></li>
        <li><Link to="/estrenodeseries">Estreno de Series</Link></li>
        <li><Link to="/peliculas">Películas</Link></li>
        <li><Link to="/estrenodepeliculas">Estreno de Películas</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;