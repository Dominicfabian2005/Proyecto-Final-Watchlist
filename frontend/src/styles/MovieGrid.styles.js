const movieGridStyles = `
  .mv-section-header {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 0 40px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }

  .mv-section-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem; font-weight: 700; color: var(--text);
  }

  .mv-pill {
    font-size: 0.75rem; font-weight: 600;
    background: rgba(168,85,247,0.1);
    border: 1px solid rgba(168,85,247,0.2);
    color: var(--purple); padding: 3px 10px; border-radius: 20px;
  }

  .mv-grid {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 0 40px 80px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  .mv-empty {
    position: relative; z-index: 1;
    max-width: 400px; margin: 0 auto;
    padding: 40px; text-align: center;
  }

  .mv-empty-icon  { font-size: 3rem; margin-bottom: 16px; }

  .mv-empty-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem; font-weight: 700;
    color: var(--text); margin-bottom: 8px;
  }

  .mv-empty-text { font-size: 0.875rem; color: var(--muted); line-height: 1.5; }

  @media (max-width: 700px) {
    .mv-grid, .mv-section-header { padding-left: 20px; padding-right: 20px; }
  }
`;

export default movieGridStyles;
