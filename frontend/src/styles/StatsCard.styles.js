const statsCardStyles = `
  .mv-stats-card {
    background: rgba(20,12,36,0.9);
    border: 1px solid rgba(168,85,247,0.18);
    border-radius: 20px; overflow: hidden;
    min-width: 300px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.08);
  }

  .mv-clap {
    height: 32px;
    background: repeating-linear-gradient(
      -52deg,
      #111 0px, #111 14px,
      #ccc 14px, #ccc 28px
    );
    border-bottom: 2px solid #000;
    position: relative;
  }

  .mv-clap::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(120,40,200,0.25), rgba(236,72,153,0.15));
  }

  .mv-stats-body { padding: 22px 24px 26px; }

  .mv-stats-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
  }

  .mv-stat { text-align: center; padding: 0 10px; }
  .mv-stat + .mv-stat { border-left: 1px solid rgba(168,85,247,0.12); }

  .mv-stat-num {
    font-family: 'Outfit', sans-serif;
    font-size: 2rem; font-weight: 800;
    background: linear-gradient(120deg, #a855f7, #ec4899);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; line-height: 1;
  }

  .mv-stat-label {
    margin-top: 6px; font-size: 0.68rem; font-weight: 500;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em;
  }

  @media (max-width: 700px) {
    .mv-stats-card { min-width: 0; width: 100%; }
  }
`;

export default statsCardStyles;
