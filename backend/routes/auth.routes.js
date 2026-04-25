const express = require("express");
const router  = express.Router();
 
const { register, login, obtenerPerfil } = require("../controllers/auth.controller");
const verificarToken                      = require("../middleware/auth.middleware");
 
// Rutas públicas — cualquiera puede acceder sin token
router.post("/register", register);
router.post("/login",    login);
 
// Ruta protegida — necesita un token válido para funcionar
// Útil para que el frontend sepa quién está logueado al recargar la página
router.get("/me", verificarToken, obtenerPerfil);
 
module.exports = router;