import searchBarStyles from "../styles/SearchBar.styles";

const FILTERS = [
  ["all",     "🎬 Todas"],
  ["pending", "⏳ Pendientes"],
  ["seen",    "✓ Vistas"],
];

export default function SearchBar({ filter, setFilter }) {
  return (
    <>
      <style>{searchBarStyles}</style>
      <div className="mv-search-wrap">
        <div className="mv-filters">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              className={`mv-filter-btn ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}