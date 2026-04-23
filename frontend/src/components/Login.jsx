import authStyles from '../styles/Auth.styles';

export default function Login({ onGoToRegister, onLoginSuccess }) {
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

          <div className="auth-input-group">
            <input type="text" placeholder="Nombre de usuario" />
          </div>

          <div className="auth-input-group">
            <input type="password" placeholder="Contraseña" />
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input type="checkbox" /> Recordarme
            </label>
            <span className="auth-forgot">¿Olvidaste tu contraseña?</span>
          </div>

          <button className="auth-submit-btn" onClick={onLoginSuccess}>
            Iniciar sesión
          </button>

          <div className="auth-footer">
            ¿No tienes cuenta?{' '}
            <button className="auth-link-btn" onClick={onGoToRegister}>
              Regístrate
            </button>
          </div>
        </div>

      </div>
    </>
  );
}