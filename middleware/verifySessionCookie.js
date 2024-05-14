const jwt = require('jsonwebtoken');

const secretKey = 'mysecretkey';

function verifySessionCookie(req, res, next) {
  const sessionToken = req.cookies['session_token'];

  if (!sessionToken) {
    return res.status(401).json({ error: 'Cookie de sesión no encontrada' });
  }

  jwt.verify(sessionToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Cookie de sesión inválida' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifySessionCookie;