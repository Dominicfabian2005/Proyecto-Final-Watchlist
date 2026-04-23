import navbarStyles from "../styles/Navbar.styles";

const NAV_LINKS = ["Inicio", "Categorías", "Reviews"];
const CATEGORIAS = [
  "Acción", "Drama", "Romance", "Comedia",
  "Terror", "Suspenso", "Animación", "Ciencia Ficción"
];

export default function Navbar({ input, setInput, onAdd }) {
  return (
    <>
      <style>{navbarStyles}</style>
      <nav className="mv-nav">

        <div className="mv-logo">
          <div className="mv-logo-icon">M</div>
          MOVYRA
        </div>

        <ul className="mv-nav-links">
          {NAV_LINKS.map((label, i) => (
            <li key={label} className="mv-nav-item">
              {label === "Categorías" ? (
                <div className="mv-dropdown">
                  <button className="mv-nav-btn">Categorías ▾</button>
                  <ul className="mv-dropdown-menu">
                    {CATEGORIAS.map((cat) => (
                      <li key={cat}>
                        <button className="mv-dropdown-item">{cat}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <button className={`mv-nav-btn ${i === 0 ? "active" : ""}`}>
                  {label}
                </button>
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
            placeholder="Agregar película…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
          />
        </div>

      </nav>
    </>
  );
}