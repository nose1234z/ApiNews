// routes/categories.router.js

const express = require('express');
const router = express.Router();

const db = require('../config/database');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

// OBTENER TODAS LAS CATEGORÍAS
router.get('/', verifyToken, async (req, res) => {
  try {
    const [categories] = await db.query('SELECT id, nombre, descripcion FROM categories WHERE activo = 1');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
  }
});

// OBTENER UNA CATEGORÍA POR ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const [categories] = await db.query('SELECT id, nombre, descripcion FROM categories WHERE id = ? AND activo = 1', [req.params.id]);
    if (categories.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categories[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error: error.message });
  }
});

// CREAR UNA NUEVA CATEGORÍA
router.post('/', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { nombre, descripcion } = req.body; // Cambiado de name/description
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
    }
    
    const userAlta = req.user.username;
    const fechaAlta = new Date();

    const [result] = await db.query(
        'INSERT INTO categories (nombre, descripcion, UserAlta, FechaAlta) VALUES (?, ?, ?, ?)', 
        [nombre, descripcion || '', userAlta, fechaAlta]
    );
    
    res.status(201).json({ 
      message: 'Categoría creada con éxito', 
      category: { id: result.insertId, nombre, descripcion } 
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') { 
      return res.status(400).json({ message: 'Ya existe una categoría con este nombre.' });
    }
    res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
  }
});

// (Las rutas PATCH y DELETE se adaptarían de forma similar si las necesitas)

module.exports = router;
module.exports = router;