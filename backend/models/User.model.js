const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
 
// ------------------------------------
// Esquema del usuario en la base de datos
// ------------------------------------
// Aquí definimos cómo luce un usuario dentro de MongoDB.
// Cada campo tiene sus propias reglas de validación.
 
const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type:      String,
      required:  [true, "El nombre de usuario es obligatorio"],
      unique:    true,
      trim:      true, // elimina espacios al inicio y al final
      minlength: [3,  "El nombre de usuario debe tener al menos 3 caracteres"],
      maxlength: [30, "El nombre de usuario no puede tener más de 30 caracteres"],
    },
 
    email: {
      type:      String,
      required:  [true, "El correo electrónico es obligatorio"],
      unique:    true,
      lowercase: true, // lo guardamos siempre en minúsculas
      trim:      true,
      match:     [/^\S+@\S+\.\S+$/, "El formato del correo no es válido"],
    },
 
    password: {
      type:      String,
      required:  [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
 
    // Lista de películas del usuario (guardada dentro del mismo documento)
   watchlist: [
  {
    tmdbId:  { type: Number },
    title:   { type: String, required: true },
    year:    { type: String },
    rating:  { type: String },
    poster:  { type: String },
    seen:    { type: Boolean, default: false },
    addedAt: { type: Date,    default: Date.now },
    genres:  { type: Array, default: [] },  // ← así
  },
],
  },
  {
    timestamps: true, // agrega automáticamente createdAt y updatedAt
  }
);
 
// ------------------------------------
// Antes de guardar: encriptar contraseña
// ------------------------------------
// Este código se ejecuta automáticamente cada vez que se crea
// o actualiza un usuario. Convierte la contraseña en un hash
// para que nunca se guarde en texto plano en la base de datos.
 
usuarioSchema.pre("save", async function (next) {
  // Si la contraseña no fue modificada, no hacemos nada
  if (!this.isModified("password")) return next();
 
  // Encriptamos la contraseña con bcrypt (12 = nivel de seguridad)
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
 
// ------------------------------------
// Método para verificar la contraseña al hacer login
// ------------------------------------
// bcrypt compara la contraseña que escribió el usuario
// con el hash que tenemos guardado en la base de datos.
 
usuarioSchema.methods.verificarPassword = async function (passwordIngresada) {
  return bcrypt.compare(passwordIngresada, this.password);
};
 
// ------------------------------------
// Evitar que la contraseña aparezca en las respuestas
// ------------------------------------
// Cuando enviamos el usuario al frontend, este método
// se asegura de que el campo password nunca viaje en el JSON.
 
usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject();
  delete usuario.password;
  return usuario;
};
 
module.exports = mongoose.model("User", usuarioSchema);
 