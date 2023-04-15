import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitud POST para registrar nuevo usuario
      const response = await axios.post('http://localhost:8000/register', { name, email, password });
      console.log(response.data); // Imprimir en consola los datos del usuario registrado
    } catch (error) {
      // Manejo de errores
      if (error.response && error.response.status === 409) {
        setError('Correo electrónico ya registrado');
      } else {
        console.error(error);
        setError('Error al registrarse');
      }
    }
  };
  const handleRegisterClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Nombre:
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

        </div>
        <div>
          <label htmlFor="email">Correo electrónico:
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>

        </div>
        <div>
          <label htmlFor="password">Contraseña:
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

        </div>
        <button className='btn btn-success' type="submit">Registrarse</button>
        <p>Ya tienes una cuenta ?</p>
        <button className='btn btn-primary' type="button" onClick={handleRegisterClick} style={{ marginLeft: '1%' }}>Login</button>
      </form>
    </div>
  );
}

export default Registro;