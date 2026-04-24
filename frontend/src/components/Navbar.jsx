import { useState, useEffect, useRef } from "react";
import navbarStyles from "../styles/Navbar.styles";

const NAV_LINKS = ["Inicio", "Categorías", "Reviews"];
const CATEGORIAS = [
  "Acción", "Drama", "Romance", "Comedia",
  "Terror", "Suspenso", "Animación", "Ciencia Ficción"
];

export default function Navbar({ input, setInput, onSearch }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown al hacer clic fuera
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
      <nav className="mv-nav">
        <div className="mv-logo">
          <div className="mv-logo-icon">
            <img src="/si.png" alt="Movyra" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          MOVYRA
        </div>

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
                  {CATEGORIAS.map((cat) => (
                    <li key={cat}>
                      <button className="mv-dropdown-item" onClick={() => setDropdownOpen(false)}>
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mv-nav-search">
          <span className="mv-nav-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar película…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <button className="mv-nav-search-btn" onClick={onSearch}>Buscar</button>
        </div>
      </nav>
    </>
  );
}