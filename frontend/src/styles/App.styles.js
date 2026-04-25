const appStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:         #0a0612;
    --surface:    rgba(20,12,36,0.9);
    --surface2:   rgba(20,12,36,0.6);
    --border:     rgba(168,85,247,0.15);
    --purple:     #a855f7;
    --purple-d:   #7c3aed;
    --pink:       #ec4899;
    --pink-l:     #f472b6;
    --purple-l:   #c084fc;
    --text:       #f0eaf8;
    --muted:      #6b5e80;
    --gradient:   linear-gradient(135deg, #7c3aed, #ec4899);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  .movyra-wrap {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .movyra-wrap::before {
    content: '';
    position: fixed; inset: 0;
    background:
      radial-gradient(ellipse 55% 45% at 80% 5%,  rgba(168,85,247,0.14) 0%, transparent 65%),
      radial-gradient(ellipse 45% 40% at 5%  85%,  rgba(236,72,153,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 30% 30% at 50% 50%,  rgba(139,60,220,0.05) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  @keyframes mvFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
    * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
  @media (max-width: 600px) {
  body {
    padding-top: 68px;
  }
}
`;


export default appStyles;
