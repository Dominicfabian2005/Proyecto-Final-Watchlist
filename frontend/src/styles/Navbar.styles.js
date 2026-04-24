const navbarStyles = `
  .mv-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center;
    padding: 0 40px; height: 68px;
    background: rgba(10,6,18,0.92);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(168,85,247,0.12);
  }

  .mv-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Outfit', sans-serif;
    font-weight: 800; font-size: 1.1rem;
    letter-spacing: 0.06em; color: var(--text);
    text-decoration: none; flex-shrink: 0;
  }

  .mv-logo-icon {
    width: 34px; height: 34px;
    background: none;
    border-radius: 8px;
    display: grid; place-items: center;
    box-shadow: none;
  }

  .mv-nav-links {
    position: absolute; left: 50%; transform: translateX(-50%);
    display: flex; gap: 4px;
    list-style: none;
  }

  .mv-nav-btn {
    padding: 6px 16px; border-radius: 8px;
    font-size: 0.85rem; font-weight: 500;
    color: var(--muted); background: none; border: none;
    cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }

  .mv-nav-btn:hover  { color: var(--text); background: rgba(168,85,247,0.1); }
  .mv-nav-btn.active { color: var(--purple-l); background: rgba(168,85,247,0.12); }

  .mv-nav-search {
    margin-left: auto;
    display: flex; align-items: center;
    background: rgba(20,12,36,0.7);
    border: 1px solid rgba(168,85,247,0.15);
    border-radius: 10px;
    padding: 0 14px;
    gap: 10px;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 320px;
  }

  .mv-nav-search:focus-within {
    border-color: rgba(168,85,247,0.45);
    box-shadow: 0 0 0 3px rgba(168,85,247,0.08);
  }

  .mv-nav-search-icon {
    color: var(--muted);
    flex-shrink: 0;
    display: flex; align-items: center;
  }

  .mv-nav-search input {
    flex: 1; background: none; border: none; outline: none;
    color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem;
    padding: 10px 0;
  }

  .mv-nav-search input::placeholder { color: var(--muted); }

  .mv-nav-search-btn {
    padding: 6px 14px;
    background: var(--gradient);
    border: none; border-radius: 7px;
    color: #fff; font-family: 'Outfit', sans-serif;
    font-size: 0.78rem; font-weight: 700;
    cursor: pointer; flex-shrink: 0;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 2px 10px rgba(168,85,247,0.35);
  }

  .mv-nav-search-btn:hover  { opacity: 0.88; transform: translateY(-1px); }
  .mv-nav-search-btn:active { transform: translateY(0); }

  @media (max-width: 900px) {
    .mv-nav { padding: 0 20px; }
    .mv-nav-search { width: 220px; }
  }

  @media (max-width: 600px) {
    .mv-nav-links { display: none; }
    .mv-nav-search { width: auto; flex: 1; margin-left: 16px; }
  }
    .mv-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #1a1a2e;
  border: 1px solid #444;
  border-radius: 8px;
  list-style: none;
  padding: 8px 0;
  z-index: 999;
  min-width: 150px;
}

.mv-dropdown-item {
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}

.mv-dropdown-item:hover {
  background: rgba(168,85,247,0.2);
}

.mv-dropdown-item.active {
  background: rgba(168,85,247,0.3);
  color: #c084fc;
  font-weight: 600;
}

.mv-dropdown-item:hover {
  background: #ffffff20;
}
`;

export default navbarStyles; 