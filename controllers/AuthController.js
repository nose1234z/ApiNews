const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }

    const { correo, contraseña } = request.body;

    // 1. Buscar al usuario solo por el correo electrónico
    User.findOne({
        where: {
            correo: correo,
            activo: true
        }
    }).then(usuario => {
        // Si no se encuentra el usuario, responder con error
        if (!usuario) {
            return response.status(401).json({ message: "Credenciales incorrectas" });
        }

        // 2. Comparar la contraseña enviada con el hash de la base de datos
        bcrypt.compare(contraseña, usuario.contraseña, (err, isMatch) => {
            if (err) {
                return response.status(500).send('Error al verificar la contraseña');
            }

            // Si las contraseñas coinciden, crear y enviar el token
            if (isMatch) {
                // Extraer datos del usuario para el token (sin la contraseña)
                const userDataForToken = {
                    id: usuario.id,
                    perfil_id: usuario.perfil_id,
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    nick: usuario.nick
                };

                const token = jwt.sign({ usuario: userDataForToken }, process.env.JWT_SECRET, { expiresIn: '24h' });
                response.status(200).json({ message: "Login con éxito", token: token });
            } else {
                // Si las contraseñas no coinciden
                response.status(401).json({ message: "Credenciales incorrectas" });
            }
        });

    }).catch(err => {
        console.error(err);
        response.status(500).send('Error al consultar el usuario');
    });
}


const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }

    // Hashear la contraseña antes de crear el usuario
    bcrypt.hash(request.body.contraseña, 10, (err, hashedPassword) => {
        if (err) {
            return response.status(500).send('Error al hashear la contraseña');
        }

        // Crear el objeto de usuario con la contraseña hasheada
        const newUser = {
            ...request.body,
            contraseña: hashedPassword,
            activo: request.body.activo !== undefined ? request.body.activo : true,
            // Si no se envía perfil_id, se asigna 2 (usuario normal) por defecto
            perfil_id: request.body.perfil_id || 2
        };

        User.create(newUser)
            .then(newEntitie => {
                // No devolver la contraseña en la respuesta
                const userResponse = newEntitie.toJSON();
                delete userResponse.contraseña;
                response.status(201).json(userResponse);
            })
            .catch(dbErr => {
                console.error(dbErr);
                response.status(500).send('Error al crear el usuario');
            });
    });
}




module.exports = {
    login,
    register,
};