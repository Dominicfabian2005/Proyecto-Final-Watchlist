import authStyles from '../styles/Auth.styles';

export default function Register({ onGoToLogin }) {
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
            Únete a<br />
            <span className="auth-highlight">Movyra</span><br />
            hoy mismo.
          </h1>

          <button className="auth-btn-switch" onClick={onGoToLogin}>
            Iniciar sesión
          </button>
        </div>

        {/* DERECHA */}
        <div className="auth-right">
          <h2>Crear cuenta</h2>

          <div className="auth-input-group">
            <input type="text" placeholder="Nombre de usuario" />
          </div>

          <div className="auth-input-group">
            <input type="email" placeholder="Correo electrónico" />
          </div>

          <div className="auth-input-group">
            <input type="password" placeholder="Contraseña" />
          </div>

          <div className="auth-input-group">
            <input type="password" placeholder="Confirmar contraseña" />
          </div>

          <button className="auth-submit-btn">Registrarse</button>

          <div className="auth-footer">
            ¿Ya tienes cuenta?{' '}
            <button className="auth-link-btn" onClick={onGoToLogin}>
              Inicia sesión
            </button>
          </div>
        </div>

      </div>
    </>
  );
} 