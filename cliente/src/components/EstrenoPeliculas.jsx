import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Estrenodepeliculas() {
  const [estrenodepeliculas, setEstrenodepeliculas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/obtener')
      .then(response => {
        // Filtramos solo las estrenodepeliculas con la categoria "Estrenos"
        const estrenos = response.data.filter(estrenodepelicula => estrenodepelicula.categoria === 'Estreno de Peliculas');
        setEstrenodepeliculas(estrenos);
      })
      .catch(error => {
        console.error('Error al cargar las películas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Estreno de Peliculas</h1>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {estrenodepeliculas.map(estrenodepelicula => (
          <div key={estrenodepelicula._id} style={{margin: '10px', textAlign: 'center'}}>
            <img src={estrenodepelicula.images} alt={estrenodepelicula.title} style={{width: '200px', height: '300px', objectFit: 'cover'}} />
            <h3>{estrenodepelicula.title}</h3>
            <p>{estrenodepelicula.description}</p>
            <p>{estrenodepelicula.categoria}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Estrenodepeliculas;