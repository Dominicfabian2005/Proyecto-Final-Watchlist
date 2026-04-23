const movieCardStyles = `
  .mv-card {
    background: rgba(20,12,36,0.85);
    border: 1px solid rgba(168,85,247,0.1);
    border-radius: 14px; overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    animation: mvFadeUp 0.4s both;
  }

  .mv-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.12);
    border-color: rgba(168,85,247,0.3);
  }

  .mv-poster {
    width: 100%; aspect-ratio: 2/3;
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 8px;
  }

  .mv-poster-emoji { font-size: 2.5rem; }

  .mv-poster-code {
    font-size: 0.65rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: rgba(240,234,248,0.3);
  }

  .mv-badge {
    position: absolute; top: 10px; right: 10px;
    padding: 3px 8px; border-radius: 6px;
    font-size: 0.65rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
  }

  .mv-badge-pending { background: rgba(236,72,153,0.15); color: #f472b6; border: 1px solid rgba(236,72,153,0.3); }
  .mv-badge-seen    { background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3); }

  .mv-card-info { padding: 14px; }

  .mv-card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.88rem; font-weight: 700; color: var(--text);
    line-height: 1.3; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }

  .mv-card-meta {
    margin-top: 6px; display: flex;
    align-items: center; justify-content: space-between;
  }

  .mv-card-year   { font-size: 0.72rem; color: var(--muted); }
  .mv-card-rating { font-size: 0.72rem; font-weight: 600; color: #f472b6; }

  .mv-card-actions { display: flex; gap: 6px; margin-top: 10px; }

  .mv-btn-toggle {
    flex: 1; padding: 6px; border-radius: 7px;
    font-size: 0.7rem; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: opacity 0.15s; border: 1px solid;
  }

  .mv-btn-toggle:hover { opacity: 0.75; }

  .mv-btn-remove {
    padding: 6px 10px; border-radius: 7px;
    background: rgba(255,80,80,0.08);
    border: 1px solid rgba(255,80,80,0.15);
    color: #f06060; font-size: 0.75rem;
    cursor: pointer; transition: opacity 0.15s;
  }

  .mv-btn-remove:hover { opacity: 0.7; }
`;

export default movieCardStyles;
