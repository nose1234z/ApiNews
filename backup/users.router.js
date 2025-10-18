const express = require('express');
const router = express.Router();

// Simulación de Base de Datos
let users = [
    { id: 1, profile_id: 1, nombres: "Juan", apellidos: "Pérez", nick: "JuanP", correo: "juan.perez@email.com" },
    { id: 2, profile_id: 2, nombres: "Ana", apellidos: "García", nick: "AnaG", correo: "ana.garcia@email.com" }
];

// OBTENER TODOS LOS USUARIOS
router.get('/', (req, res) => {
    res.json(users);
});

// OBTENER UN USUARIO POR ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
});

// CREAR UN NUEVO USUARIO
router.post('/', (req, res) => {
    const newUser = req.body;
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    newUser.id = maxId + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

// ACTUALIZAR UN USUARIO
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    res.json(updatedUser);
});

// ELIMINAR UN USUARIO
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

    users.splice(index, 1);
    res.json({ message: 'Usuario eliminado' });
});

// Exporta el router directamente
module.exports = router;

