// routes/news.router.js

const express = require('express');
const router = express.Router();

const db = require('../config/database');
const { verifyToken } = require('../middlewares/auth.middleware');

// Query Base con JOINs para simular el "populate" con tu nueva estructura
const selectNewsQuery = `
    SELECT 
        news.id, 
        news.titulo, 
        news.descripcion,
        news.fecha_publicacion,
        news.imagen,
        JSON_OBJECT('id', cat.id, 'nombre', cat.nombre) AS categoria,
        JSON_OBJECT('id', st.id, 'nombre', st.nombre) AS estado,
        JSON_OBJECT('id', usr.id, 'nick', usr.nick, 'nombre', usr.nombre, 'apellidos', usr.apellidos) AS usuario
    FROM news
    LEFT JOIN categories AS cat ON news.categoria_id = cat.id
    LEFT JOIN states AS st ON news.estado_id = st.id
    LEFT JOIN users AS usr ON news.usuario_id = usr.id
`;

// GET: OBTENER TODAS LAS NOTICIAS
router.get('/', verifyToken, async (req, res) => {
    try {
        const [noticias] = await db.query(`${selectNewsQuery} WHERE news.activo = 1`);
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las noticias', error: error.message });
    }
});

// GET: OBTENER UNA NOTICIA POR ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const [noticias] = await db.query(`${selectNewsQuery} WHERE news.id = ? AND news.activo = 1`, [req.params.id]);
        if (noticias.length === 0) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }
        res.json(noticias[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la noticia', error: error.message });
    }
});

// POST: CREAR UNA NUEVA NOTICIA
router.post('/', verifyToken, async (req, res) => {
    try {
        const { titulo, descripcion, categoria_id, estado_id } = req.body;
        
        if (!titulo || !descripcion || !categoria_id || !estado_id) {
            return res.status(400).json({ message: 'Los campos (titulo, descripcion, categoria_id, estado_id) son obligatorios.' });
        }

        const userAlta = req.user.username; // Suponemos que es el nick
        const fechaAlta = new Date();
        const fecha_publicacion = new Date(); // Puedes ajustar esto

        const [result] = await db.query(
            'INSERT INTO news (titulo, descripcion, categoria_id, estado_id, usuario_id, fecha_publicacion, UserAlta, FechaAlta, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, descripcion, categoria_id, estado_id, req.user.id, fecha_publicacion, userAlta, fechaAlta, ''] // Imagen vacía por ahora
        );
        
        const [newNews] = await db.query(`${selectNewsQuery} WHERE news.id = ?`, [result.insertId]);
        res.status(201).json({ message: 'Noticia creada con éxito', news: newNews[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la noticia', error: error.message });
    }
});

module.exports = router;