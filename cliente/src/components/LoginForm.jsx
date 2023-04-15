import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  

  const handleInputChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        name: state.name,
        email: state.email,
        password: state.password
      });
      console.log(response.data);
      alert("Inicio de sesión exitoso");
      setIsLoggedIn(true);
     navigate('/inicio'); // Redireccionamos a otra ruta usando navigate
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };
  const handleRegisterClick = () => {
    navigate('/registro');
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        Nombre:
        <input placeholder='Nombre' type="text" name="name" value={state.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Correo electrónico:
        <input placeholder='email' type="email" name="email" value={state.email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Contraseña:
        <input placeholder='contraseña' type="password" name="password" value={state.password} onChange={handleInputChange} />
      </label>
      <br />
      <button className='btn btn-success' type="submit">Iniciar sesión</button>
      <button className='btn btn-primary' type="button" onClick={handleRegisterClick} style={{ marginLeft: '1%' }}>Registrarse</button>
    </form>
  );
};

export default LoginForm;