export default function SearchResults({ results, onAdd, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0d0a18",
        border: "1px solid rgba(168,85,247,0.2)",
        borderRadius: "16px", padding: "24px",
        width: "90%", maxWidth: "700px",
        maxHeight: "80vh", overflowY: "auto"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <span style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.1rem", color: "#f0eaf8" }}>
            Resultados
          </span>
          <button onClick={onClose} style={{
            background: "none", border: "none",
            color: "#6b5e80", cursor: "pointer", fontSize: "1.2rem"
          }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "16px" }}>
          {results.map((movie) => (
            <div key={movie.id} style={{
              background: "#1a0d2e",
              border: "1px solid rgba(168,85,247,0.1)",
              borderRadius: "10px", overflow: "hidden",
              cursor: "pointer", transition: "transform 0.2s"
            }}
              onClick={() => onAdd(movie)}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", display: "block" }}
                />
              ) : (
                <div style={{
                  width: "100%", aspectRatio: "2/3",
                  background: "#200d30", display: "grid", placeItems: "center",
                  fontSize: "2rem"
                }}>🎬</div>
              )}
              <div style={{ padding: "8px" }}>
                <div style={{
                  fontFamily: "Outfit", fontSize: "0.75rem",
                  fontWeight: 700, color: "#f0eaf8",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                }}>{movie.title}</div>
                <div style={{ fontSize: "0.68rem", color: "#6b5e80", marginTop: "2px" }}>
                  {movie.release_date?.slice(0, 4)} · ★ {movie.vote_average?.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}