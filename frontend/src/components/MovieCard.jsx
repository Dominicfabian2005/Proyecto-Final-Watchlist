import movieCardStyles from "../styles/MovieCard.styles";

export default function MovieCard({ movie, index, onToggle, onRemove }) {
  const { id, title, year, rating, seen, color, emoji } = movie;

  return (
    <>
      <style>{movieCardStyles}</style>
      <div className="mv-card" style={{ animationDelay: `${index * 0.05}s` }}>
        <div className="mv-poster" style={{ background: color }}>
          <div className="mv-poster-emoji">{emoji}</div>
          <div className="mv-poster-code">{title.slice(0, 3).toUpperCase()}</div>
          <span className={`mv-badge ${seen ? "mv-badge-seen" : "mv-badge-pending"}`}>
            {seen ? "✓ Vista" : "• Pendiente"}
          </span>
        </div>
        <div className="mv-card-info">
          <div className="mv-card-title" title={title}>{title}</div>
          <div className="mv-card-meta">
            <span className="mv-card-year">{year}</span>
            <span className="mv-card-rating">★ {rating}</span>
          </div>
          <div className="mv-card-actions">
            <button
              className="mv-btn-toggle"
              onClick={() => onToggle(id)}
              style={{
                background:   seen ? "rgba(168,85,247,0.12)" : "rgba(236,72,153,0.1)",
                borderColor:  seen ? "rgba(168,85,247,0.28)" : "rgba(236,72,153,0.28)",
                color:        seen ? "#c084fc"               : "#f472b6",
              }}
            >
              {seen ? "↩ Pendiente" : "✓ Vista"}
            </button>
            <button className="mv-btn-remove" onClick={() => onRemove(id)}>✕</button>
          </div>
        </div>
      </div>
    </>
  );
}
