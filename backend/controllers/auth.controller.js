const jwt  = require("jsonwebtoken");
const User = require("../models/User.model");
 
// ------------------------------------
// Función auxiliar para generar el token JWT
// ------------------------------------
// Recibe el ID del usuario y devuelve un token firmado.
// Este token es lo que el frontend guarda y manda en cada petición.
 
function generarToken(idUsuario) {
  return jwt.sign(
    { id: idUsuario },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // el token dura 7 días
  );
}
 
// ------------------------------------
// REGISTRO — POST /api/auth/register
// ------------------------------------
// Crea una cuenta nueva. Valida los datos, revisa que no exista
// el usuario, lo guarda en la base de datos y devuelve un token.
 
exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
 
    // Verificamos que todos los campos llegaron
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        mensaje: "Por favor completa todos los campos",
      });
    }
 
    // Las contraseñas deben coincidir
    if (password !== confirmPassword) {
      return res.status(400).json({
        mensaje: "Las contraseñas no coinciden",
      });
    }
 
    // Revisamos si ya existe alguien con ese email o username
    const usuarioExistente = await User.findOne({
      $or: [{ email }, { username }],
    });
 
    if (usuarioExistente) {
      // Le decimos exactamente qué campo está duplicado
      const campoDuplicado = usuarioExistente.email === email
        ? "correo electrónico"
        : "nombre de usuario";
 
      return res.status(409).json({
        mensaje: `Ese ${campoDuplicado} ya está registrado`,
      });
    }
 
    // Creamos el usuario — el modelo se encarga de encriptar la contraseña
    const nuevoUsuario = await User.create({ username, email, password });
 
    // Generamos el token para que el usuario quede logueado de inmediato
    const token = generarToken(nuevoUsuario._id);
 
    res.status(201).json({
      mensaje: "¡Cuenta creada exitosamente! Bienvenido a Movyra 🎬",
      token,
      usuario: nuevoUsuario, // la contraseña no aparece aquí gracias a toJSON()
    });
 
  } catch (error) {
    // Errores de validación del esquema de Mongoose
    if (error.name === "ValidationError") {
      const primerError = Object.values(error.errors)[0].message;
      return res.status(400).json({ mensaje: primerError });
    }
 
    console.error("Error en registro:", error);
    res.status(500).json({ mensaje: "Algo salió mal, intenta de nuevo más tarde" });
  }
};
 
// ------------------------------------
// LOGIN — POST /api/auth/login
// ------------------------------------
// Verifica las credenciales del usuario y devuelve un token si son correctas.
// Acepta tanto username como email en el campo "username".
 
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
 
    if (!username || !password) {
      return res.status(400).json({
        mensaje: "Escribe tu usuario y contraseña para continuar",
      });
    }
 
    // Buscamos por username o por email (el usuario puede usar cualquiera)
    // Usamos .select("+password") porque en el esquema lo ocultamos por defecto
    const usuario = await User.findOne({
      $or: [{ username }, { email: username }],
    }).select("+password");
 
    // Si no existe el usuario o la contraseña es incorrecta
    // Damos el mismo mensaje en ambos casos por seguridad (no revelar qué existe)
    if (!usuario || !(await usuario.verificarPassword(password))) {
      return res.status(401).json({
        mensaje: "Usuario o contraseña incorrectos",
      });
    }
 
    const token = generarToken(usuario._id);
 
    res.json({
      mensaje: `¡Bienvenido de vuelta, ${usuario.username}!`,
      token,
      usuario: usuario.toJSON(), // contraseña removida
    });
 
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Algo salió mal, intenta de nuevo más tarde" });
  }
};
 
// ------------------------------------
// PERFIL — GET /api/auth/me
// ------------------------------------
// Devuelve la información del usuario que está logueado.
// Solo funciona si el token es válido (lo verifica el middleware).
 
exports.obtenerPerfil = async (req, res) => {
  // req.user ya viene con los datos gracias al middleware
  res.json({ usuario: req.user });
};