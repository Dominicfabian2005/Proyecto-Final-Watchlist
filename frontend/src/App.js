import { useState } from "react";
import appStyles from "./styles/App.styles";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import SearchResults from "./components/SearchResults";

const COLORS = ["#1a0d2e", "#2a0d28", "#1a0a2a", "#200d30", "#150a20", "#1e0a1e"];
const rand   = (arr) => arr[Math.floor(Math.random() * arr.length)];

const API = "http://localhost:30000";

export default function App() {
  const [view, setView] = useState("login");

  const [movies, setMovies] = useState(() => {
    try { return JSON.parse(localStorage.getItem("movyra") || "[]"); }
    catch { return []; }
  });
  const [filter,        setFilter]        = useState("all");
  const [input,         setInput]         = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults,   setShowResults]   = useState(false);

  // Buscar en TMDB
  const searchMovies = async () => {
    if (!input.trim()) return;
    try {
      const res  = await fetch(`${API}/api/movies/search?query=${input}`);
      const data = await res.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (err) {
      console.error("Error buscando:", err);
    }
  };

  // Agregar desde resultados de TMDB
  const addFromSearch = async (movie) => {
    const newMovie = {
      title:  movie.title,
      year:   movie.release_date?.slice(0, 4) || "----",
      rating: movie.vote_average?.toFixed(1)  || "0.0",
      poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
      seen:   false,
      color:  rand(COLORS),
    };
    try {
      const res   = await fetch(`${API}/api/movies`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(newMovie),
      });
      const saved = await res.json();
      setMovies((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("Error agregando:", err);
    }
    setShowResults(false);
    setInput("");
  };

  const toggleSeen  = (id) => setMovies((prev) => prev.map((m) => m._id === id ? { ...m, seen: !m.seen } : m));
  const removeMovie = (id) => setMovies((prev) => prev.filter((m) => m._id !== id));

  const filtered =
    filter === "seen"    ? movies.filter((m) =>  m.seen) :
    filter === "pending" ? movies.filter((m) => !m.seen) :
    movies;

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
            onLoginSuccess={() => setView("app")}
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
            onRegisterSuccess={() => setView("app")}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{appStyles}</style>
      <div className="movyra-wrap">
        <Navbar
          input={input}
          setInput={setInput}
          onSearch={searchMovies}
        />
        <Hero stats={stats} />
        <SearchBar filter={filter} setFilter={setFilter} />
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
        />
      </div>
    </>
  );
}