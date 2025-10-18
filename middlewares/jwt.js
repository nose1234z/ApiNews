const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header && authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded.usuario.perfil_id === 1) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}

const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header && authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}


module.exports = {
    authenticateAdmin,
    authenticateAny
};