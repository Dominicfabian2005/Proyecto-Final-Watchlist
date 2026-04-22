import statsCardStyles from "../styles/StatsCard.styles";

export default function StatsCard({ stats }) {
  const items = [
    [stats.total,   "Total"],
    [stats.pending, "Pendientes"],
    [stats.seen,    "Vistas"],
  ];

  return (
    <>
      <style>{statsCardStyles}</style>
      <div className="mv-stats-card">
        <div className="mv-clap" />
        <div className="mv-stats-body">
          <div className="mv-stats-row">
            {items.map(([num, label]) => (
              <div className="mv-stat" key={label}>
                <div className="mv-stat-num">{num}</div>
                <div className="mv-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
