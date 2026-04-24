const searchBarStyles = `
  .mv-search-wrap {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 0 40px 48px;
    animation: mvFadeUp 0.5s 0.25s both;
  }

  .mv-search-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.68rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em;
    color: var(--muted); margin-bottom: 12px;
  }

  .mv-search-bar {
    display: flex; gap: 10px;
    background: rgba(20,12,36,0.8);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 6px 6px 6px 20px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .mv-search-bar:focus-within {
    border-color: rgba(168,85,247,0.45);
    box-shadow: 0 0 0 4px rgba(168,85,247,0.08);
  }

  .mv-search-bar input {
    flex: 1; background: none; border: none; outline: none;
    color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    padding: 10px 0;
  }

  .mv-search-bar input::placeholder { color: var(--muted); }

  .mv-btn-add {
    padding: 12px 28px;
    background: var(--gradient);
    border: none; border-radius: 10px;
    color: #fff; font-family: 'Outfit', sans-serif;
    font-size: 0.875rem; font-weight: 700;
    cursor: pointer; letter-spacing: 0.02em;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(168,85,247,0.4);
    white-space: nowrap;
  }

  .mv-btn-add:hover  { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(168,85,247,0.5); }
  .mv-btn-add:active { transform: translateY(0); }

  /* FILTER TABS */
  .mv-filters {
    display: flex; gap: 8px;
    margin-top: 16px; flex-wrap: wrap;
  }

  .mv-filter-btn {
    padding: 9px 22px; border-radius: 20px;
    font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Outfit', sans-serif;
    border: 1.5px solid rgba(168,85,247,0.35); /* más visible */
    background: rgba(255,255,255,0.04);        /* fondo sutil */
    color: rgba(255,255,255,0.7);              /* texto más claro */
    letter-spacing: 0.02em;
  }

  .mv-filter-btn:hover {
    color: #fff;
    border-color: rgba(168,85,247,0.6);
    background: rgba(168,85,247,0.12);
    transform: translateY(-1px);
  }

  .mv-filter-btn.active {
    background: var(--gradient);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 14px rgba(168,85,247,0.45);
    transform: translateY(-1px);
  }

  @media (max-width: 700px) {
    .mv-search-wrap { padding-left: 20px; padding-right: 20px; }
    .mv-filter-btn  { padding: 8px 16px; font-size: 0.8rem; }
  }
`;

export default searchBarStyles;