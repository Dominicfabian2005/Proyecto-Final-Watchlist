const express = require("express");
const router  = express.Router();
 
const { obtenerLista, agregarPelicula, cambiarEstado, eliminarPelicula } = require("../controllers/list.controller");
const verificarToken = require("../middleware/auth.middleware");
 
// Todas las rutas de la lista requieren que el usuario esté logueado.
// verificarToken se aplica a TODAS las rutas de este archivo.
router.use(verificarToken);
 
router.get("/",                    obtenerLista);      // ver toda la lista
router.post("/",                   agregarPelicula);   // agregar una película
router.patch("/:movieId/toggle",   cambiarEstado);     // marcar vista o pendiente
router.delete("/:movieId",         eliminarPelicula);  // eliminar una película
 
module.exports = router;