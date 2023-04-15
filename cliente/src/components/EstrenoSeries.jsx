import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Estrenodeseries() {
  const [estrenodeseries, setEstrenodeseries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/obtener')
      .then(response => {
        // Filtramos solo las estrenodeseries con la categoria "Estrenos"
        const estrenos = response.data.filter(estrenodeserie => estrenodeserie.categoria === 'Estreno de Series');
        setEstrenodeseries(estrenos);
      })
      .catch(error => {
        console.error('Error al cargar las películas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Estreno de Series</h1>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {estrenodeseries.map(estrenodeserie => (
          <div key={estrenodeserie._id} style={{margin: '10px', textAlign: 'center'}}>
            <img src={estrenodeserie.images} alt={estrenodeserie.title} style={{width: '200px', height: '300px', objectFit: 'cover'}} />
            <h3>{estrenodeserie.title}</h3>
            <p>{estrenodeserie.description}</p>
            <p>{estrenodeserie.categoria}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Estrenodeseries;