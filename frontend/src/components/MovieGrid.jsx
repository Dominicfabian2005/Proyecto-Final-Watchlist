import movieGridStyles from "../styles/MovieGrid.styles";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, onToggle, onRemove, onRate }) {
  return (
    <>
      <style>{movieGridStyles}</style>

      <div className="mv-section-header">
        <span className="mv-section-title">Mi lista</span>
        <span className="mv-pill">{movies.length} película{movies.length !== 1 ? "s" : ""}</span>
      </div>

      {movies.length > 0 ? (
        <div className="mv-grid">
          {movies.map((movie, i) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              index={i}
              onToggle={onToggle}
              onRemove={onRemove}
              onRate={onRate}
            />
          ))}
        </div>
      ) : (
        <div className="mv-empty">
          <div className="mv-empty-icon">🎬</div>
          <div className="mv-empty-title">Nada por aquí todavía</div>
          <div className="mv-empty-text">Agrega tu primera película usando el buscador de arriba.</div>
        </div>
      )}
    </>
  );
}
