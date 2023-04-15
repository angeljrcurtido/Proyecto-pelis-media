
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import NavBar from './components/BarraDes';
import CargarPeliculas from './components/CargarPeliculas';
import Peliculas from './components/Peliculas';
import Series from './components/Series';
import Estrenodepeliculas from './components/EstrenoPeliculas';
import Estrenodeseries from './components/EstrenoSeries';
import Registro from './components/Registro';
import LoginForm from './components/LoginForm';

function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/estrenodepeliculas" element={isLoggedIn ? <Estrenodepeliculas /> : <Navigate to="/login" />} />
          <Route path="/estrenodeseries" element={isLoggedIn ? <Estrenodeseries /> : <Navigate to="/login" />} />
          <Route path="/series" element={isLoggedIn ? <Series /> : <Navigate to="/login" />} />
          <Route path="/inicio" element={isLoggedIn ? <CargarPeliculas /> : <Navigate to="/login" />} />
          <Route path="/peliculas" element={isLoggedIn ? <Peliculas /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
