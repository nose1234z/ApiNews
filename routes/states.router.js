// routes/states.router.js

const express = require('express');
const router = express.Router();

const db = require('../config/database');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

// OBTENER TODOS LOS ESTADOS
router.get('/', verifyToken, async (req, res) => {
    try {
        const [states] = await db.query('SELECT id, nombre, abreviacion FROM states WHERE activo = 1');
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estados', error: error.message });
    }
});

// OBTENER UN ESTADO POR ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const [states] = await db.query('SELECT id, nombre, abreviacion FROM states WHERE id = ? AND activo = 1', [req.params.id]);
        if (states.length === 0) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }
        res.json(states[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el estado', error: error.message });
    }
});

// CREAR UN NUEVO ESTADO
router.post('/', verifyToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { nombre, abreviacion } = req.body; // Cambiado de 'name' a 'nombre'
        if (!nombre || !abreviacion) {
            return res.status(400).json({ message: 'El nombre y la abreviación del estado son obligatorios.' });
        }

        // Faltan los campos de auditoría, los pongo como placeholder
        const userAlta = req.user.username; // Suponiendo que el username está en el token
        const fechaAlta = new Date();

        const [result] = await db.query(
            'INSERT INTO states (nombre, abreviacion, UserAlta, FechaAlta) VALUES (?, ?, ?, ?)', 
            [nombre, abreviacion, userAlta, fechaAlta]
        );
        res.status(201).json({ 
            message: 'Estado creado con éxito', 
            state: { id: result.insertId, nombre, abreviacion } 
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Ya existe un estado con ese nombre o abreviación.' });
        }
        res.status(500).json({ message: 'Error al crear el estado', error: error.message });
    }
});

// (Las rutas PATCH y DELETE se adaptarían de forma similar si las necesitas)

module.exports = router;
