import heroStyles from "../styles/Hero.styles";
import StatsCard from "./StatsCard";

export default function Hero({ stats }) {
  return (
    <>
      <style>{heroStyles}</style>
      <section className="mv-hero">
        <div>
          <h1>My<br /><span>Personal</span><br />Watchlist</h1>
          <p>Organiza y rastrea todas las películas que quieres ver o ya viste.</p>
        </div>
        <StatsCard stats={stats} />
      </section>
    </>
  );
}
