const heroStyles = `
  .mv-hero {
    position: relative; z-index: 1;
    padding: 72px 40px 56px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center; gap: 48px;
    max-width: 1200px; margin: 0 auto;
    animation: mvFadeUp 0.5s both;
  }

  .mv-hero h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2.8rem, 5vw, 4.2rem);
    font-weight: 900; line-height: 1.08;
    letter-spacing: -0.01em; color: var(--text);
  }

  .mv-hero h1 span {
    background: linear-gradient(120deg, #a855f7, #ec4899);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .mv-hero p {
    margin-top: 16px; font-size: 1rem;
    color: var(--muted); font-weight: 400;
    max-width: 340px; line-height: 1.65;
  }

  @media (max-width: 700px) {
    .mv-hero { grid-template-columns: 1fr; padding: 48px 20px 32px; }
  }
`;

export default heroStyles;
