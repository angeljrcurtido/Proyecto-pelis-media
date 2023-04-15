import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Series() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/obtener')
      .then(response => {
        // Filtramos solo las series con la categoria "Estrenos"
        const estrenos = response.data.filter(serie => serie.categoria === 'Series');
        setSeries(estrenos);
      })
      .catch(error => {
        console.error('Error al cargar las películas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Series</h1>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {series.map(serie => (
          <div key={serie._id} style={{margin: '10px', textAlign: 'center'}}>
            <img src={serie.images} alt={serie.title} style={{width: '200px', height: '300px', objectFit: 'cover'}} />
            <h3>{serie.title}</h3>
            <p>{serie.description}</p>
            <p>{serie.categoria}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Series;