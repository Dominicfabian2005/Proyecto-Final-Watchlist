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

  .mv-card-actions { display: flex; gap: 6px; margin-top: 10px; align-items: center; }

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

  .mv-menu-wrap { position: relative; }

  .mv-btn-menu {
    padding: 6px 10px; border-radius: 7px;
    background: rgba(168,85,247,0.08);
    border: 1px solid rgba(168,85,247,0.2);
    color: #c084fc; font-size: 1rem;
    cursor: pointer; transition: opacity 0.15s;
    letter-spacing: 2px;
  }

  .mv-btn-menu:hover { opacity: 0.7; }

  .mv-menu {
    position: absolute; bottom: calc(100% + 6px); right: 0;
    background: rgba(10,6,18,0.97);
    border: 1px solid rgba(168,85,247,0.2);
    border-radius: 10px; padding: 6px;
    min-width: 130px; z-index: 200;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .mv-menu-item {
    width: 100%; text-align: left;
    padding: 8px 12px; border-radius: 7px;
    background: none; border: none;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
    cursor: pointer; transition: all 0.2s;
  }

  .mv-menu-item:hover { color: var(--text); background: rgba(168,85,247,0.12); }

  .mv-rating-box {
    margin-top: 12px; padding: 14px;
    background: rgba(168,85,247,0.06);
    border: 1px solid rgba(168,85,247,0.2);
    border-radius: 10px; text-align: center;
  }

  .mv-rating-question {
    font-size: 0.82rem; color: var(--text);
    font-weight: 600; margin-bottom: 10px;
  }

  .mv-thumbs { display: flex; justify-content: center; gap: 16px; margin-bottom: 12px; }

  .mv-thumb {
    font-size: 1.4rem; background: none; border: none;
    cursor: pointer; transition: transform 0.2s;
    filter: grayscale(1); opacity: 0.5;
  }

  .mv-thumb:hover, .mv-thumb.active-like, .mv-thumb.active-dislike {
    filter: grayscale(0); opacity: 1; transform: scale(1.2);
  }

  .mv-stars { display: flex; justify-content: center; gap: 6px; margin-bottom: 10px; }

  .mv-star {
    font-size: 1.4rem; background: none; border: none;
    cursor: pointer; transition: transform 0.15s, color 0.15s;
  }

  .mv-star:hover { transform: scale(1.2); }

  .mv-rating-result {
    font-size: 0.78rem; color: #c084fc;
    margin-bottom: 10px; font-weight: 600;
  }

  .mv-rating-close {
    padding: 5px 16px; border-radius: 7px;
    background: rgba(168,85,247,0.12);
    border: 1px solid rgba(168,85,247,0.25);
    color: #c084fc; font-size: 0.75rem;
    cursor: pointer; transition: opacity 0.15s;
  }

  .mv-rating-close:hover { opacity: 0.7; }
`;

export default movieCardStyles;
