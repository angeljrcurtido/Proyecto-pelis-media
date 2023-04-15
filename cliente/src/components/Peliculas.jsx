import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/obtener')
      .then(response => {
        // Filtramos solo las peliculas con la categoria "Estrenos"
        const estrenos = response.data.filter(pelicula => pelicula.categoria === 'Peliculas');
        setPeliculas(estrenos);
      })
      .catch(error => {
        console.error('Error al cargar las películas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Listado de películas</h1>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {peliculas.map(pelicula => (
          <div key={pelicula._id} style={{margin: '10px', textAlign: 'center'}}>
            <img src={pelicula.images} alt={pelicula.title} style={{width: '200px', height: '300px', objectFit: 'cover'}} />
            <h3>{pelicula.title}</h3>
            <p>{pelicula.description}</p>
            <p>{pelicula.categoria}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Peliculas;