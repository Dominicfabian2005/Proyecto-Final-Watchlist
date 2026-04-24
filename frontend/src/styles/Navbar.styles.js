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
    background: none; border-radius: 8px;
    display: grid; place-items: center;
  }

  .mv-nav-links {
    position: absolute; left: 50%; transform: translateX(-50%);
    display: flex; gap: 4px;
    list-style: none; margin: 0; padding: 0;
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
    padding: 0 14px; gap: 10px;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 320px;
  }

  .mv-nav-search:focus-within {
    border-color: rgba(168,85,247,0.45);
    box-shadow: 0 0 0 3px rgba(168,85,247,0.08);
  }

  .mv-nav-search-icon {
    color: var(--muted); flex-shrink: 0;
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

  /* HAMBURGER */
  .mv-hamburger {
    display: none;
    flex-direction: column; justify-content: center; gap: 5px;
    background: none; border: none; cursor: pointer;
    padding: 6px; margin-left: auto;
  }

  .mv-hamburger span {
    display: block; width: 22px; height: 2px;
    background: var(--text); border-radius: 2px;
    transition: all 0.3s;
  }

  /* MENÚ MÓVIL */
  .mv-mobile-menu {
    display: none;
    position: fixed; top: 68px; left: 0; right: 0;
    background: rgba(10,6,18,0.98);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(168,85,247,0.15);
    padding: 16px 20px 24px;
    flex-direction: column; gap: 8px;
    z-index: 99;
  }

  .mv-mobile-menu.open { display: flex; }

  .mv-mobile-menu .mv-nav-btn {
    width: 100%; text-align: left;
    padding: 12px 16px; font-size: 0.95rem;
    border-radius: 10px;
  }

  .mv-mobile-search {
    display: flex; align-items: center;
    background: rgba(20,12,36,0.7);
    border: 1px solid rgba(168,85,247,0.2);
    border-radius: 10px;
    padding: 0 14px; gap: 10px;
    margin-top: 8px;
  }

  .mv-mobile-search input {
    flex: 1; background: none; border: none; outline: none;
    color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    padding: 12px 0;
  }

  .mv-mobile-search input::placeholder { color: var(--muted); }

  .mv-mobile-search-btn {
    padding: 6px 14px;
    background: var(--gradient);
    border: none; border-radius: 7px;
    color: #fff; font-family: 'Outfit', sans-serif;
    font-size: 0.78rem; font-weight: 700;
    cursor: pointer;
  }

  /* DROPDOWN */
  .mv-dropdown {
    position: absolute; top: 100%; left: 0;
    background: rgba(16,10,30,0.98);
    border: 1px solid rgba(168,85,247,0.3);
    border-radius: 10px;
    list-style: none; padding: 8px 0;
    z-index: 999; min-width: 160px;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .mv-dropdown-item {
    width: 100%; padding: 9px 18px;
    background: none; border: none;
    color: rgba(255,255,255,0.8);
    cursor: pointer; text-align: left;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    transition: background 0.2s, color 0.2s;
  }

  .mv-dropdown-item:hover {
    background: rgba(168,85,247,0.15);
    color: #fff;
  }

  .mv-dropdown-item.active {
    background: rgba(168,85,247,0.25);
    color: #c084fc; font-weight: 600;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .mv-nav { padding: 0 20px; }
    .mv-nav-search { width: 220px; }
  }

  @media (max-width: 600px) {
    .mv-nav-links  { display: none; }
    .mv-nav-search { display: none; }
    .mv-hamburger  { display: flex; }
  }
    .mv-logout-btn {
  background: transparent;
  border: 1px solid rgba(168,85,247,0.3);
  border-radius: 8px; padding: 6px 14px;
  color: #6b5e80; cursor: pointer;
  font-family: 'Outfit', sans-serif; font-size: 0.85rem;
  transition: all 0.2s;
  margin-left: 16px;
}

.mv-logout-btn:hover {
  color: #f0eaf8;
  border-color: rgba(168,85,247,0.7);
}
`;

export default navbarStyles;