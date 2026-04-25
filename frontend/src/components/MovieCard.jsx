import { useState } from "react";
import movieCardStyles from "../styles/MovieCard.styles";
 
const API = "http://localhost:30000";
 
export default function MovieCard({ movie, index, onToggle, onRemove, onRate }) {
  const [commentSaved, setCommentSaved] = useState(false);
  const { _id, title, year, rating, seen, color, emoji, poster, userRating } = movie;
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [showRating,  setShowRating]  = useState(false);
  const [hovered,     setHovered]     = useState(0);
  const [comment,     setComment]     = useState(movie.comment || "");
 
  // Guarda el comentario y las estrellas en el backend
  const guardarReview = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/list/${_id}/review`, {
        method:  "PATCH",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          stars:   userRating || 0,
          comment: comment,
        }),
      });
 
      if (res.ok) {
        onRate(_id, { comment });
        setCommentSaved(true);
        setTimeout(() => setCommentSaved(false), 3000);
      }
    } catch (err) {
      console.error("Error guardando reseña:", err);
    }
  };
 
  return (
    <>
      <style>{movieCardStyles}</style>
      <div className="mv-card" style={{ animationDelay: `${index * 0.05}s` }}>
        <div className="mv-poster" style={{ background: color }}>
          {poster ? (
            <img src={poster} alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <>
              <div className="mv-poster-emoji">{emoji || "🎬"}</div>
              <div className="mv-poster-code">{title?.slice(0, 3).toUpperCase()}</div>
            </>
          )}
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
              onClick={() => onToggle(_id)}
              style={{
                background:  seen ? "rgba(168,85,247,0.12)" : "rgba(236,72,153,0.1)",
                borderColor: seen ? "rgba(168,85,247,0.28)" : "rgba(236,72,153,0.28)",
                color:       seen ? "#c084fc"               : "#f472b6",
              }}
            >
              {seen ? "↩ Pendiente" : "✓ Vista"}
            </button>
 
            <button className="mv-btn-remove" onClick={() => onRemove(_id)}>✕</button>
 
            {seen && (
              <div className="mv-menu-wrap">
                <button
                  className="mv-btn-menu"
                  onClick={() => { setMenuOpen(!menuOpen); setShowRating(false); }}
                >
                  ⋯
                </button>
                {menuOpen && (
                  <div className="mv-menu">
                    <button
                      className="mv-menu-item"
                      onClick={() => { setShowRating(true); setMenuOpen(false); }}
                    >
                      ⭐ Calificar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
 
          {showRating && (
            <div className="mv-rating-box">
 
              {/* Estrellas */}
              <div className="mv-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="mv-star"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => onRate(_id, { userRating: star })}
                    style={{
                      color: star <= (hovered || userRating || 0)
                        ? "#f472b6"
                        : "rgba(240,234,248,0.2)"
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
 
              {/* Comentario */}
              <div className="mv-comment-section">
                <textarea
                  className="mv-comment-input"
                  placeholder="Deja tu comentario aquí..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                {commentSaved && (
                  <p className="mv-comment-saved">¡Comentario guardado! ✓</p>
                )}
                <button className="mv-comment-save" onClick={guardarReview}>
                  Guardar comentario
                </button>
              </div>
 
              <button className="mv-rating-close" onClick={() => setShowRating(false)}>
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}