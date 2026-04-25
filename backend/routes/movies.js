const express            = require("express");
const router             = express.Router();
const { obtenerGeneros } = require("../utils/Generos");

// Búsqueda de películas — GET /api/movies/search?query=inception
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(400).json({ mensaje: "Escribe algo para buscar" });
    }

    const respuesta = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-MX&page=1`
    );

    const datos = await respuesta.json();

    const peliculas = datos.results.slice(0, 8).map((pelicula) => ({
      id:           pelicula.id,
      title:        pelicula.title,
      release_date: pelicula.release_date,
      vote_average: pelicula.vote_average,
      poster_path:  pelicula.poster_path,
      overview:     pelicula.overview,
      genres:       obtenerGeneros(pelicula.genre_ids),
    }));

    res.json(peliculas);

  } catch (error) {
    console.error("Error buscando películas:", error);
    res.status(500).json({ mensaje: "No se pudo realizar la búsqueda" });
  }
});


// Lista de géneros — GET /api/movies/generos
router.get("/generos", (req, res) => {
  const { GENEROS_TMDB } = require("../utils/generos");
  res.json({ generos: GENEROS_TMDB });
});

module.exports = router;