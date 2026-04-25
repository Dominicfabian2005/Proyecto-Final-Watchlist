import { useState } from "react";
import appStyles from "./styles/App.styles";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import SearchResults from "./components/SearchResults";
import Dashboard from "./components/Dashboard";

const API = "http://localhost:30000";

export default function App() {
  const [view, setView] = useState("login");

  const [movies,        setMovies]        = useState([]);
  const [filter,        setFilter]        = useState("all");
  const [categoria,     setCategoria]     = useState(null);
  const [input,         setInput]         = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults,   setShowResults]   = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const cargarLista = async () => {
    const token = localStorage.getItem("token");
    try {
      const res  = await fetch(`${API}/api/list`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      setMovies(data.watchlist || []);
    } catch (err) {
      console.error("Error cargando lista:", err);
    }
  };

  const searchMovies = async () => {
    if (!input.trim()) return;
    try {
      const res  = await fetch(`${API}/api/movies/search?query=${input}`);
      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : []);
      setShowResults(true);
    } catch (err) {
      console.error("Error buscando:", err);
      setSearchResults([]);
      setShowResults(true);
    }
  };

  const addFromSearch = async (movie) => {
  console.log("MOVIE COMPLETA:", JSON.stringify(movie)); // ← agrega esto
  const token = localStorage.getItem("token");
    try {
      
      const res  = await fetch(`${API}/api/list`, {
        method:  "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          tmdbId: movie.id,
          title:  movie.title,
          year:   movie.release_date?.slice(0, 4) || "----",
          rating: movie.vote_average?.toFixed(1)  || "0.0",
          poster: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : null,
          // ✅ Así debe quedar
genres: movie.genres || [],
        }),
      });
      const data = await res.json();
      if (!res.ok) { console.error(data.mensaje); return; }
      setMovies((prev) => [data.pelicula, ...prev]);
    } catch (err) {
      console.error("Error agregando:", err);
    }
    setShowResults(false);
    setInput("");
  };

  const toggleSeen = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res  = await fetch(`${API}/api/list/${id}/toggle`, {
        method:  "PATCH",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return;
      setMovies((prev) =>
        prev.map((m) => m._id === id ? data.pelicula : m)
      );
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
  };

  const removeMovie = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/list/${id}`, {
        method:  "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) return;
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error eliminando:", err);
    }
  };

  // ✅ Nueva función para calificar película
  const rateMovie = (id, data) => {
    setMovies((prev) =>
      prev.map((m) => m._id === id ? { ...m, ...data } : m)
    );
  };

  const filtered = movies.filter((m) => {
    // Filtro por estado (seen/pending)
    if (filter === "seen" && !m.seen) return false;
    if (filter === "pending" && m.seen) return false;
    // Filtro por categoría
    if (categoria && m.genres) {
      const tieneCategoria = m.genres.some(g => g.name === categoria);
      if (!tieneCategoria) return false;
    }
    return true;
  });

  const stats = {
    total:   movies.length,
    seen:    movies.filter((m) =>  m.seen).length,
    pending: movies.filter((m) => !m.seen).length,
  };

  if (view === "login") {
    return (
      <>
        <style>{appStyles}</style>
        <div className="auth-page">
          <Login
            onGoToRegister={() => setView("register")}
            onLoginSuccess={() => { setView("app"); cargarLista(); }}
          />
        </div>
      </>
    );
  }

  if (view === "register") {
    return (
      <>
        <style>{appStyles}</style>
        <div className="auth-page">
          <Register
            onGoToLogin={() => setView("login")}
            onRegisterSuccess={() => { setView("app"); cargarLista(); }}
          />
        </div>
      </>
    );
  }
  const handleLogout = () => {
  localStorage.removeItem("token");
  setMovies([]);
  setView("login");
};

  return (
    <>
      <style>{appStyles}</style>
      <div className="movyra-wrap">
        <Navbar
          input={input}
          setInput={setInput}
          onSearch={searchMovies}
          categoria={categoria}
          setCategoria={setCategoria}
          onLogout={handleLogout}
          onDashboard={() => setShowDashboard(true)}
        />
        <Hero stats={stats} />
        <SearchBar filter={filter} setFilter={setFilter} />
        {showDashboard && (
       <Dashboard onClose={() => setShowDashboard(false)} />
       )}

          {showResults && (
          <SearchResults
            results={searchResults}
            onAdd={addFromSearch}
            onClose={() => setShowResults(false)}
          />
          
        )}
        <MovieGrid
          movies={filtered}
          onToggle={toggleSeen}
          onRemove={removeMovie}
          onRate={rateMovie}
        />
      </div>
    </>
  );
}