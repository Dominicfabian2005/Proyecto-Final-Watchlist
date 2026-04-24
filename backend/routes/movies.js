const express = require("express");
const router = express.Router();
const listController = require("../controllers/list.controller");
const axios = require("axios");

// Búsqueda en TMDB
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query,
          language: "es-ES",
        },
      }
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: "Error buscando en TMDB" });
  }
});

// Rutas de la lista
router.get("/",                      listController.obtenerLista);
router.post("/",                     listController.agregarPelicula);
router.patch("/:movieId/toggle",     listController.cambiarEstado);
router.delete("/:movieId",           listController.eliminarPelicula);

module.exports = router;