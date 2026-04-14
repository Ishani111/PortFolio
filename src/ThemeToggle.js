import "./ThemeToggle.css";
import { useTheme, themes } from "./ThemeContext";

const ThemeToggle = () => {
  const { themeName, setThemeName, theme } = useTheme();

  return (
    <div className="tt-page">
      <div className="tt-card">
        <div className="tt-header">
          <h2 className="tt-title">Theme Settings</h2>
          <p className="tt-sub">Choose a theme for the entire app</p>
        </div>

        <div className="tt-grid">
          {Object.entries(themes).map(([key, t]) => (
            <button
              key={key}
              className={`tt-swatch ${themeName === key ? "active" : ""}`}
              onClick={() => setThemeName(key)}
              style={{
                "--s-accent": t.accent,
                "--s-bg":     t.card,
                "--s-border": t.border,
                "--s-text":   t.text,
              }}
            >
              <span className="tt-swatch-dot" />
              <span className="tt-swatch-name">{t.name}</span>
              {themeName === key && <span className="tt-swatch-active">✓</span>}
            </button>
          ))}
        </div>

        <div className="tt-preview">
          <p className="tt-preview-label">Current theme</p>
          <p className="tt-preview-name">{theme.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;