import { useState, useEffect, useRef } from "react";
import navbarStyles from "../styles/Navbar.styles";

const NAV_LINKS = ["Inicio", "Categorías"];
const CATEGORIAS = [
  "Acción", "Aventura", "Animación", "Comedia",
  "Crimen", "Documental", "Drama", "Familiar",
  "Fantasía", "Historia", "Terror", "Música",
  "Misterio", "Romance", "Ciencia Ficción",
  "Suspenso", "Bélica", "Western"
];

export default function Navbar({ input, setInput, onSearch, categoria, setCategoria, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{navbarStyles}</style>

      {/* Modal confirmar salir */}
      {showConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#0d0a18",
            border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: "16px", padding: "32px",
            textAlign: "center", width: "320px"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>👋</div>
            <p style={{ color: "#f0eaf8", fontFamily: "Outfit", fontSize: "1rem", marginBottom: "8px", fontWeight: 700 }}>
              ¿Cerrar sesión?
            </p>
            <p style={{ color: "#6b5e80", fontSize: "0.85rem", marginBottom: "24px" }}>
              Tu lista se guardará y podrás volver cuando quieras.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={() => setShowConfirm(false)} style={{
                padding: "8px 20px", borderRadius: "8px",
                border: "1px solid rgba(168,85,247,0.3)",
                background: "transparent", color: "#6b5e80",
                cursor: "pointer", fontFamily: "Outfit"
              }}>
                Cancelar
              </button>
              <button onClick={() => { setShowConfirm(false); onLogout(); }} style={{
                padding: "8px 20px", borderRadius: "8px",
                border: "none", background: "rgba(168,85,247,0.8)",
                color: "#fff", cursor: "pointer", fontFamily: "Outfit", fontWeight: 700
              }}>
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="mv-nav">
        {/* Logo + botón salir */}
        <div className="mv-logo">
          <div className="mv-logo-icon">
            <img src="/si.png" alt="Movyra" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          MOVYRA
          <button
            onClick={() => setShowConfirm(true)}
            className="mv-logout-btn"
          >
            Salir
          </button>
        </div>

        {/* Links desktop */}
        <ul className="mv-nav-links">
          {NAV_LINKS.map((label, i) => (
            <li key={label} style={{ position: "relative" }} ref={label === "Categorías" ? dropdownRef : null}>
              <button
                className={`mv-nav-btn ${i === 0 ? "active" : ""} ${label === "Categorías" && dropdownOpen ? "active" : ""}`}
                onClick={() => label === "Categorías" && setDropdownOpen(!dropdownOpen)}
              >
                {label === "Categorías" ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    Categorías <span style={{ fontSize: "0.65rem" }}>{dropdownOpen ? "▲" : "▼"}</span>
                  </span>
                ) : label}
              </button>

              {label === "Categorías" && dropdownOpen && (
                <ul className="mv-dropdown">
                  <li>
                    <button
                      className={`mv-dropdown-item ${categoria === null ? "active" : ""}`}
                      onClick={() => { setCategoria(null); setDropdownOpen(false); }}
                    >
                      Todas
                    </button>
                  </li>
                  {CATEGORIAS.map((cat) => (
                    <li key={cat}>
                      <button
                        className={`mv-dropdown-item ${categoria === cat ? "active" : ""}`}
                        onClick={() => { setCategoria(cat); setDropdownOpen(false); }}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Buscador desktop */}
        <div className="mv-nav-search">
          <span className="mv-nav-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            type="text" placeholder="Buscar película…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <button className="mv-nav-search-btn" onClick={onSearch}>Buscar</button>
        </div>

        {/* Hamburger móvil */}
        <button className="mv-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Menú móvil */}
      <div className={`mv-mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((label) => (
          <button key={label} className="mv-nav-btn" onClick={() => setMenuOpen(false)}>
            {label}
          </button>
        ))}
        <div className="mv-mobile-search">
          <input
            type="text" placeholder="Buscar película…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { onSearch(); setMenuOpen(false); } }}
          />
          <button className="mv-mobile-search-btn" onClick={() => { onSearch(); setMenuOpen(false); }}>
            Buscar
          </button>
        </div>
        <button className="mv-logout-btn" onClick={() => { setMenuOpen(false); setShowConfirm(true); }}>
          Salir
        </button>
      </div>
    </>
  );
}