const { obtenerGeneros } = require("../utils/Generos");
 
// ------------------------------------
// Búsqueda de películas usando la API de TMDB
// ------------------------------------
// Cuando el usuario escribe en el buscador, esta función
// llama a la API de TMDB y devuelve los resultados con géneros incluidos.
 
exports.buscarPeliculas = async (req, res) => {
  try {
    const { query } = req.query;
 
    if (!query || !query.trim()) {
      return res.status(400).json({ mensaje: "Escribe algo para buscar" });
    }
 
    const TMDB_KEY = process.env.TMDB_API_KEY;
 
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&language=es-MX&page=1`
    );
 
    if (!respuesta.ok) {
      return res.status(500).json({ mensaje: "Error al consultar TMDB" });
    }
 
    const datos = await respuesta.json();
 
    // Devolvemos los primeros 8 resultados con géneros ya resueltos
    const peliculas = datos.results.slice(0, 8).map((pelicula) => ({
      id:           pelicula.id,
      title:        pelicula.title,
      release_date: pelicula.release_date,
      vote_average: pelicula.vote_average,
      poster_path:  pelicula.poster_path,
      overview:     pelicula.overview,
      genres:       obtenerGeneros(pelicula.genre_ids), // ← géneros con nombre incluido
    }));
 
    res.json(peliculas);
 
  } catch (error) {
    console.error("Error en búsqueda de películas:", error);
    res.status(500).json({ mensaje: "No se pudo realizar la búsqueda" });
  }
};
 
// ------------------------------------
// Obtener lista de todos los géneros disponibles
// ------------------------------------
// El frontend puede usar esta ruta para construir
// el menú de categorías dinámicamente.
 
exports.obtenerGeneros = (req, res) => {
  const { GENEROS_TMDB } = require("../utils/generos");
  res.json({ generos: GENEROS_TMDB });
};