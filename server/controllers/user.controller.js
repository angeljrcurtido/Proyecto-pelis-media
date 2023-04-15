const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwtConfig = require('../config/jwt.config');

const saltRounds = 10;

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Verificar si el correo ya existe
      const existentUser = await User.findOne({ email });
      if (existentUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      // Crear nuevo usuario y guardar en base de datos
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({ name, email, password: hashedPassword });

      // Generar token JWT y enviarlo al cliente
      const token = jwtConfig.sign({ id: newUser._id });
      res.cookie('token', token, { httpOnly: true });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar usuario por correo electrónico
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Verificar si el correo y la contraseña coinciden
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch || user.name !== req.body.name) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generar token JWT y enviarlo al cliente
      const token = jwtConfig.sign({ id: user._id });
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
  me: async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.sendStatus(204);
  }
}