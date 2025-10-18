// routes/user.router.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { connection } = require('../config/database.js');
const { User } = require('../models/UserModel.js');
const { Profile } = require('../models/ProfileModel.js');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// ==========================================================
// RUTAS DE AUTENTICACIÓN (Registro e Inicio de Sesión)
// ==========================================================

// RUTA PARA REGISTRAR UN NUEVO USUARIO
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellidos, nick, correo, contraseña, perfil_id } = req.body;

    if (!nombre || !nick || !correo || !contraseña || !perfil_id) {
      return res.status(400).json({ message: 'Los campos nombre, nick, correo, contraseña y perfil_id son obligatorios' });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    
    const userAlta = nick; // El mismo usuario se da de alta

    const user = await User.create({
      nombre,
      apellidos: apellidos || '',
      nick,
      correo,
      contraseña: hashedPassword,
      perfil_id,
      UserAlta: userAlta,
    });

    res.status(201).json({ 
        message: 'Usuario registrado con éxito', 
        user: { id: user.id, nombre, nick, correo, perfil_id } 
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El correo o nick ya existe' });
    }
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
});

// RUTA PARA INICIAR SESIÓN (LOGIN)
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await User.findOne({
      where: { correo: correo, activo: 1 },
      include: [{ model: Profile, as: 'perfil' }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const payload = {
      id: user.id,
      username: user.nick,
      role: user.perfil.nombre
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token, role: user.perfil.nombre });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});


// ==========================================================
// RUTAS DE GESTIÓN DE USUARIOS (CRUD) - ¡AÑADIDAS!
// ==========================================================

// OBTENER TODOS LOS USUARIOS (Solo para Admins)
router.get('/', [verifyToken, authorizeRoles(['admin'])], async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'apellidos', 'nick', 'correo', 'perfil_id', 'activo']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
});

module.exports = router;