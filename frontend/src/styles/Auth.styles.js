const authStyles = `
  .auth-page {
    height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    overflow: hidden;
    position: relative;
  }

  .auth-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 40%, rgba(120,30,160,0.35) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 70%, rgba(80,10,120,0.25)  0%, transparent 60%),
      radial-gradient(ellipse 100% 80% at 50% 0%,  rgba(60,0,100,0.4)   0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .auth-card {
    position: relative;
    z-index: 1;
    width: 900px;
    min-height: 520px;
    background: var(--surface);
    border-radius: 22px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow:
      0 30px 80px rgba(0,0,0,0.6),
      0 0 0 1px rgba(255,255,255,0.04) inset,
      0 1px 0 rgba(255,255,255,0.08) inset;
    animation: mvFadeUp 0.6s ease;
  }

  .auth-left {
    width: 50%;
    padding: 55px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-right: 1px solid rgba(255,255,255,0.07);
    background: linear-gradient(160deg, rgba(100,20,160,0.08) 0%, transparent 60%);
  }

  .auth-logo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150%;
    margin-bottom: 10px;
  }

  .auth-logo-icon {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }

  .auth-left h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 33px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
    color: var(--text);
  }

  .auth-highlight {
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .auth-btn-switch {
    padding: 13px 36px;
    border: none;
    border-radius: 30px;
    background: linear-gradient(90deg, var(--purple-l), var(--pink-l));
    color: #fff;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(192,132,252,0.4);
    margin-top: 20px;
  }

  .auth-btn-switch:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(192,132,252,0.55);
  }

  .auth-right {
    width: 50%;
    padding: 55px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .auth-right h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 28px;
    color: var(--text);
    text-align: center;
  }

  .auth-input-group {
    margin-bottom: 14px;
  }

  .auth-input-group input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    outline: none;
    background: rgba(240,230,255,0.06);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    transition: border-color 0.2s, background 0.2s;
  }

  .auth-input-group input::placeholder {
    color: var(--muted);
  }

  .auth-input-group input:focus {
    border-color: rgba(168,85,247,0.5);
    background: rgba(240,230,255,0.09);
  }

  .auth-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12.5px;
    margin: 10px 0 20px;
    color: var(--muted);
  }

  .auth-remember {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .auth-remember input[type="checkbox"] {
    accent-color: var(--purple);
    width: 13px;
    height: 13px;
  }

  .auth-forgot {
    cursor: pointer;
    transition: color 0.2s;
  }

  .auth-forgot:hover {
    color: var(--purple-l);
  }

  .auth-submit-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 30px;
    background: var(--gradient);
    color: white;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 22px;
    margin-top: 8px;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 22px rgba(236,72,153,0.4);
    letter-spacing: 0.02em;
  }

  .auth-submit-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(236,72,153,0.55);
  }

  .auth-footer {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
  }

  .auth-footer a {
    color: var(--purple-l);
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .auth-footer a:hover {
    color: var(--pink-l);
  }

  .auth-link-btn {
  background: none;
  border: none;
  padding: 0;
  color: var(--purple-l);
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.2s;
}

.auth-link-btn:hover {
  color: var(--pink-l);
}
`;

export default authStyles; 