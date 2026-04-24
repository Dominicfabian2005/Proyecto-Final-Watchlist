import { useState } from "react";
import authStyles from "../styles/Auth.styles";

const API = "http://localhost:30000";

export default function Login({ onGoToRegister, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.mensaje || "Error al iniciar sesión");
        return;
      }

      // ✅ Guardamos el token para usarlo en todas las peticiones protegidas
      localStorage.setItem("token", data.token);
      onLoginSuccess();
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

        {/* IZQUIERDA */}
        <div className="auth-left">
          <div className="auth-logo-wrap">
            <img src="/Remove.png" alt="Movyra Logo" className="auth-logo-icon" />
          </div>
          <h1>
            Tu lista de<br />
            películas, <span className="auth-highlight">en un<br />solo lugar.</span>
          </h1>
          <button className="auth-btn-switch" onClick={onGoToRegister}>
            Registrarse
          </button>
        </div>

        {/* DERECHA */}
        <div className="auth-right">
          <h2>Iniciar sesión</h2>

          {error && <p style={{ color: "#ff6b6b", marginBottom: "10px", fontSize: "14px" }}>{error}</p>}

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
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button className="auth-submit-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

          <div className="auth-footer">
            ¿No tienes cuenta?{" "}
            <button className="auth-link-btn" onClick={onGoToRegister}>
              Regístrate
            </button>
          </div>
        </div>

      </div>
    </>
  );
}