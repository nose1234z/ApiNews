// middlewares/role.middleware.js

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        // req.user fue establecido en el middleware verifyToken
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Error de autenticación.' });
        }

        const userRole = req.user.role;
        console.log('User role:', userRole);

        if (allowedRoles.includes(userRole)) {
            next(); // El rol del usuario está permitido, continuar
        } else {
            // El rol del usuario no tiene permiso para acceder a esta ruta
            return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
        }
    };
}

module.exports = { authorizeRoles };