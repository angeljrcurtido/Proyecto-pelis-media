import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css'

const CargarPeliculas = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  // Obtener las categorias disponibles y la lista de peliculas
  useEffect(() => {
    axios.get('http://localhost:8000/api/categorias-enum')
      .then(response => {
        setCategoriaSeleccionada(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:8000/api/obtener')
      .then(response => {
        setPeliculas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  //Enviar la información del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    if (peliculaSeleccionada) {
      // Editar la pelicula seleccionada
      axios.put(`http://localhost:8000/api/editarpelicula/${peliculaSeleccionada._id}`, { title, description, images, categoria })
        .then(response => {
          // Llamar nuevamente a la API para obtener los datos actualizados
          axios.get('http://localhost:8000/api/obtener')
            .then(response => {
              setPeliculas(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Agregar una nueva pelicula
      axios.post('http://localhost:8000/api/agregar', { title, description, images, categoria })
        .then(response => {
          // Llamar nuevamente a la API para obtener los datos actualizados
          axios.get('http://localhost:8000/api/obtener')
            .then(response => {
              setPeliculas(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }

    //Limpiar el estado después de enviar el formulario
    setTitle('');
    setDescription('');
    setImages('');
    setCategoria('');
    setPeliculaSeleccionada(null);
  }

  // Obtener los detalles de una pelicula y actualizar el estado para permitir su edición
  const handleEditarPelicula = (id) => {
    axios.get(`http://localhost:8000/api/obtenerunapelicula/${id}`)
      .then(response => {
        setPeliculaSeleccionada(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImages(response.data.images);
        setCategoria(response.data.categoria);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // Eliminar una pelicula
  const handleEliminarPelicula = (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta película?")) {
      axios.delete(`http://localhost:8000/api/borrar/${id}`)
        .then(response => {
          // Llamar nuevamente a la API para obtener los datos actualizados
          axios.get('http://localhost:8000/api/obtener')
            .then(response => {
              setPeliculas(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} class="form-container">
        <h2 className="titulodecarga">Cargar Peliculas</h2>
        <div className="subgrupo1">
          <div className="form-group title">
            <label for="title" class="form-label">Titulo:</label>
            <input placeholder="Titulo de Pelicula" type="text" class="form-input title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form-group1">
            <label for="description" class="form-label">Description:</label>
            <textarea placeholder="Descripcion de Pelicula" class="form-input" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <div className="subgrupo2">
          <div className="form-group2">
            <label for="images" class="form-label">Images:</label>
            <input placeholder="Coloque URL de imagen" type="text" class="form-input" id="images" value={images} onChange={(e) => setImages(e.target.value)} />
          </div>

          <div class="form-group">
            <label for="categoria" class="form-label">Categoria:</label>
            <select class="form-select" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Seleccionar categoría</option>
              {categoriaSeleccionada.map((categoria, index) => (
                <option key={index} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-success1">{peliculaSeleccionada ? "Editar" : "Guardar"}</button>
      </form>

      <h2>Películas cargadas:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {peliculas.map((pelicula, index) => (
          <div key={pelicula._id} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={pelicula.images} alt={pelicula.title} style={{ width: '200px', height: '300px', objectFit: 'cover' }} />
            <h3>{pelicula.title}</h3>
            <p>{pelicula.description}</p>
            <p>{pelicula.categoria}</p>

            <button className="btn btn-success" onClick={() => handleEditarPelicula(pelicula._id)}>Editar</button>
            <button className="btn btn-danger" onClick={() => handleEliminarPelicula(pelicula._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div >
  );
};

export default CargarPeliculas;