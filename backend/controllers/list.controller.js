const User = require("../models/User.model");
 
// ------------------------------------
// OBTENER LISTA — GET /api/list
// ------------------------------------
// Devuelve todas las películas del usuario que está logueado.
 
exports.obtenerLista = async (req, res) => {
  res.json({ watchlist: req.user.watchlist });
};
 
// ------------------------------------
// AGREGAR PELÍCULA — POST /api/list
// ------------------------------------
// Agrega una nueva película a la lista del usuario.
// Recibe los datos de la película en el body de la petición.
 
exports.agregarPelicula = async (req, res) => {
  try {
    const { tmdbId, title, year, rating, poster } = req.body;
 
    // El título es lo único realmente obligatorio
    if (!title) {
      return res.status(400).json({
        mensaje: "El título de la película es obligatorio",
      });
    }
 
    // Si viene un ID de TMDB, evitamos agregar la misma película dos veces
    if (tmdbId) {
      const yaExiste = req.user.watchlist.find((pelicula) => pelicula.tmdbId === tmdbId);
      if (yaExiste) {
        return res.status(409).json({
          mensaje: "Esa película ya está en tu lista",
        });
      }
    }
 
    // Buscamos al usuario en la base de datos para poder guardar los cambios
    const usuario = await User.findById(req.user._id);
 
    // Agregamos la película al inicio de la lista (la más reciente primero)
    usuario.watchlist.unshift({ tmdbId, title, year, rating, poster });
    await usuario.save();
 
    res.status(201).json({
      mensaje: `"${title}" fue agregada a tu lista 🎬`,
      pelicula: usuario.watchlist[0],
      watchlist: usuario.watchlist,
    });
 
  } catch (error) {
    console.error("Error al agregar película:", error);
    res.status(500).json({ mensaje: "No se pudo agregar la película, intenta de nuevo" });
  }
};
 
// ------------------------------------
// MARCAR VISTA / PENDIENTE — PATCH /api/list/:movieId/toggle
// ------------------------------------
// Cambia el estado de una película entre "vista" y "pendiente".
// Si estaba pendiente la marca como vista, y viceversa.
 
exports.cambiarEstado = async (req, res) => {
  try {
    const usuario  = await User.findById(req.user._id);
 
    // Buscamos la película dentro del watchlist usando su ID
    const pelicula = usuario.watchlist.id(req.params.movieId);
 
    if (!pelicula) {
      return res.status(404).json({
        mensaje: "No encontramos esa película en tu lista",
      });
    }
 
    // Invertimos el estado actual
    pelicula.seen = !pelicula.seen;
    await usuario.save();
 
    const nuevoEstado = pelicula.seen ? "vista ✓" : "pendiente ⏳";
 
    res.json({
      mensaje: `"${pelicula.title}" marcada como ${nuevoEstado}`,
      pelicula,
    });
 
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    res.status(500).json({ mensaje: "No se pudo actualizar la película, intenta de nuevo" });
  }
};
 
// ------------------------------------
// ELIMINAR PELÍCULA — DELETE /api/list/:movieId
// ------------------------------------
// Elimina una película de la lista del usuario.
 
exports.eliminarPelicula = async (req, res) => {
  try {
    const usuario  = await User.findById(req.user._id);
    const pelicula = usuario.watchlist.id(req.params.movieId);
 
    if (!pelicula) {
      return res.status(404).json({
        mensaje: "No encontramos esa película en tu lista",
      });
    }
 
    const tituloPelicula = pelicula.title; // guardamos el título antes de eliminar
 
    pelicula.deleteOne();
    await usuario.save();
 
    res.json({
      mensaje: `"${tituloPelicula}" fue eliminada de tu lista`,
      watchlist: usuario.watchlist,
    });
 
  } catch (error) {
    console.error("Error al eliminar película:", error);
    res.status(500).json({ mensaje: "No se pudo eliminar la película, intenta de nuevo" });
  }
};