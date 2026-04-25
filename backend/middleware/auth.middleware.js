const jwt  = require("jsonwebtoken");
const User = require("../models/User.model");
 
// ------------------------------------
// Middleware de autenticación
// ------------------------------------
// Este código actúa como un guardia de seguridad.
// Se ejecuta ANTES de que el usuario llegue a cualquier ruta protegida.
//
// Lo que hace:
// 1. Revisa si el usuario mandó un token en el header de la petición
// 2. Verifica que ese token sea válido y no esté vencido
// 3. Busca al usuario en la base de datos
// 4. Si todo está bien, deja pasar y adjunta el usuario a req.user
// 5. Si algo falla, devuelve un error 401 (no autorizado)
 
module.exports = async function verificarToken(req, res, next) {
  try {
    // El token viene en el header así: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
 
    // Si no hay header o no tiene el formato correcto, rechazamos
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Necesitas iniciar sesión para acceder a esto",
      });
    }
 
    // Separamos "Bearer" del token real
    const token = authHeader.split(" ")[1];
 
    // Verificamos que el token sea auténtico usando nuestra clave secreta
    const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET);
 
    // Buscamos al usuario en la base de datos usando el ID que viene en el token
    const usuario = await User.findById(tokenDecodificado.id).select("-password");
 
    // Si el usuario fue eliminado pero su token sigue activo
    if (!usuario) {
      return res.status(401).json({
        mensaje: "Este usuario ya no existe",
      });
    }
 
    // Todo bien — adjuntamos el usuario para que las rutas lo puedan usar
    req.user = usuario;
    next();
 
  } catch (error) {
    // El token expiró (después de 7 días por defecto)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        mensaje: "Tu sesión expiró, por favor vuelve a iniciar sesión",
      });
    }
 
    // El token fue modificado o es inválido
    return res.status(401).json({
      mensaje: "Token inválido, por favor inicia sesión nuevamente",
    });
  }
};