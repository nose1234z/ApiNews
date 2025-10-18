// middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No se proveyó un token.' });
    }

    // El token viene en el formato "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Formato de token inválido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            // Si la firma es inválida o el token expiró
            return res.status(401).json({ message: 'Token no válido o expirado.' });
        }
        
        // ¡Importante! Adjuntamos el payload decodificado a la petición
        req.user = decoded; 
        next(); // Pasamos al siguiente middleware o a la ruta
    });
}

module.exports = { verifyToken };
