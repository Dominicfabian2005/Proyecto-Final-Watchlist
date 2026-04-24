const express = require("express");
const router  = express.Router();
const axios   = require("axios");

// ✅ Solo búsqueda en TMDB — las rutas de lista van en list.routes.js
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const response  = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key:  process.env.TMDB_API_KEY,
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

module.exports = router; 