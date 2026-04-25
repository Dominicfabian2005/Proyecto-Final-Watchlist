import { useState } from "react";
import authStyles from "../styles/Auth.styles";

const API = "http://localhost:30000";

export default function Register({ onGoToLogin, onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError("Completa todos los campos");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${API}/api/auth/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          username,
          email,
          password,
          confirmPassword: confirm, // ✅ nombre que espera el backend
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.mensaje || "Error al registrarse");
        return;
      }

      localStorage.setItem("token", data.token);
      onRegisterSuccess();
    } catch (err) {
      setError("No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-card">

        <div className="auth-left">
          <div className="auth-logo-wrap">
            <img src="/Remove.png" alt="Movyra Logo" className="auth-logo-icon" />
          </div>
          <h1>
            Únete a<br />
            <span className="auth-highlight">Movyra</span><br />
            hoy mismo.
          </h1>
          <button className="auth-btn-switch" onClick={onGoToLogin}>
            Iniciar sesión
          </button>
        </div>

        <div className="auth-right">
          <h2>Crear cuenta</h2>

          {error && (
            <p style={{ color: "#ff6b6b", marginBottom: "10px", fontSize: "14px" }}>
              {error}
            </p>
          )}

          <div className="auth-input-group">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="auth-input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            />
          </div>

          <button className="auth-submit-btn" onClick={handleRegister} disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          <div className="auth-footer">
            ¿Ya tienes cuenta?{" "}
            <button className="auth-link-btn" onClick={onGoToLogin}>
              Inicia sesión
            </button>
          </div>
        </div>

      </div>
    </>
  );
}