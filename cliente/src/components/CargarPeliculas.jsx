import React, { useState, useEffect, useRef } from "react";
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
  const formRef = useRef(null);

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

    // Reiniciar el formulario
    formRef.current.reset();
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

  //Funcion para convertir imagen a base64 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
   

    reader.onloadend = () => {
      const base64Image = reader.result;
      setImages(base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} className="form-container">
        <h2 className="titulodecarga">Cargar Peliculas</h2>
        <div className="subgrupo1">
          <div className="form-group title">
            <label htmlFor="title" className="form-label">Titulo:</label>
            <input placeholder="Titulo de Pelicula" type="text" className="form-input title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form-group1">
            <label htmlFor="description" className="form-label">Descripción:</label>
            <textarea placeholder="Descripción de Pelicula" className="form-input" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <div className="subgrupo2">
          <div className="form-group2">
            <label htmlFor="images" className="form-label">Imagen:</label>
            <input type="file" accept=".jpg, .jpeg, .png" className="form-input" id="images" onChange={handleImageChange} />
          </div>

          <div className="form-group">
            <label htmlFor="categoria" className="form-label">Categoría:</label>
            <select className="form-select" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
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
    </div>
  );
};

export default CargarPeliculas;
