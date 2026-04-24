require('dotenv').config();

const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const express    = require("express");
const mongoose   = require("mongoose");
const cors       = require("cors");

const authRoutes   = require("./routes/auth.routes");
const listRoutes   = require("./routes/list.routes");
const moviesRoutes = require("./routes/movie");  // ← nombre del archivo de tu compañera

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado ✅"))
  .catch(err => console.log(err));

// Rutas
app.use("/api/auth",   authRoutes);
app.use("/api/list",   listRoutes);
app.use("/api/movies", moviesRoutes);

// Arrancar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT} 🚀`);
});