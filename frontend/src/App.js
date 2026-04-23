import { useState } from "react";
import appStyles from "./styles/App.styles";
import authStyles from "./styles/Auth.styles";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";

const EMOJIS = ["🎬", "🎥", "🍿", "🎞️", "🎦", "📽️"];
const COLORS  = ["#1a0d2e", "#2a0d28", "#1a0a2a", "#200d30", "#150a20", "#1e0a1e"];
const rand    = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function App() {
  const [view, setView] = useState("login"); // "login" | "register" | "app"

  const [movies, setMovies] = useState(() => {
    try { return JSON.parse(localStorage.getItem("movyra") || "[]"); }
    catch { return []; }
  });
  const [filter, setFilter] = useState("all");
  const [input,  setInput]  = useState("");

  const addMovie = () => {
    const title = input.trim();
    if (!title) return;
    setMovies((prev) => [{
      id:     Date.now(),
      title,
      year:   String(2010 + Math.floor(Math.random() * 15)),
      rating: (6.5 + Math.random() * 3).toFixed(1),
      seen:   false,
      color:  rand(COLORS),
      emoji:  rand(EMOJIS),
    }, ...prev]);
    setInput("");
  };

  const toggleSeen  = (id) => setMovies((prev) => prev.map((m) => m.id === id ? { ...m, seen: !m.seen } : m));
  const removeMovie = (id) => setMovies((prev) => prev.filter((m) => m.id !== id));

  const filtered =
    filter === "seen"    ? movies.filter((m) =>  m.seen) :
    filter === "pending" ? movies.filter((m) => !m.seen) :
    movies;

  const stats = {
    total:   movies.length,
    seen:    movies.filter((m) =>  m.seen).length,
    pending: movies.filter((m) => !m.seen).length,
  };

  // ── Pantallas de auth ──
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

  // ── App principal ──
  return (
    <>
      <style>{appStyles}</style>
      <div className="movyra-wrap">
        <Navbar input={input} setInput={setInput} onAdd={addMovie} />
        <Hero stats={stats} />
        <SearchBar filter={filter} setFilter={setFilter} />
        <MovieGrid
          movies={filtered}
          onToggle={toggleSeen}
          onRemove={removeMovie}
        />
      </div>
    </>
  );
} 