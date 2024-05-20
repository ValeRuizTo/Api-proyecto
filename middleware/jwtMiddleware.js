const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
function jwtMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    // Verifica si hay un token JWT
    if (!token) {
        return res.status(401).json({ error: 'Token de autorización no proporcionado' });
    }

    try {
        // Verifica y decodifica el token JWT
        const decoded = jwt.verify(token, 'mysecretkey'); 
        
        // Agrega la información del usuario decodificado al objeto de solicitud
        req.user = decoded;

        // Llama al siguiente middleware
        next();
        
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Token de autorización inválido' });
    }
}

module.exports = jwtMiddleware;