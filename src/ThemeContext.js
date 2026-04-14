import { icon } from "leaflet";
import { createContext, useContext, useState } from "react";

export const themes = {
  dark: {
    name: "Dark",
    bg: "#111111",
    card: "#1e1e1e",
    border: "#2a2a2a",
    accent: "#cc0000",
    accentHover: "#aa0000",
    text: "antiquewhite",
    textMuted: "#888888",
    textDim: "#555555",
    navBg: "#111111",
    headerBg: "antiquewhite",
    headerText: "#111111",
    icon: "rgba(204, 0, 0, 0.35)",
    iconBorder: "#cc0000",
  },
  light: {
    name: "Light",
    bg: "#f5f5f0",
    card: "#ffffff",
    border: "#dddddd",
    accent: "#cc0000",
    accentHover: "#aa0000",
    text: "#111111",
    textMuted: "#555555",
    textDim: "#888888",
    navBg: "#ffffff",
    headerBg: "#111111",
    headerText: "antiquewhite",
    icon: "rgba(204, 0, 0, 0.35)",
    iconBorder: "#cc0000",
  },
  peach: {
    name: "Peach",
    bg: "#2d1a14",
    card: "#3d2419",
    border: "#5a3020",
    accent: "#e8845a",
    accentHover: "#c9663c",
    text: "#fde8d8",
    textMuted: "#b07860",
    textDim: "#7a5040",
    navBg: "#2d1a14",
    headerBg: "#fde8d8",
    headerText: "#2d1a14",
    icon: "#663c29",
    iconBorder: "#e8845a",
  },
  blue: {
    name: "Blue",
    bg: "#0a0f1e",
    card: "#111828",
    border: "#1e2d4a",
    accent: "#3a7bd5",
    accentHover: "#2860b8",
    text: "#dce8ff",
    textMuted: "#5a7aaa",
    textDim: "#334466",
    navBg: "#0a0f1e",
    headerBg: "#dce8ff",
    headerText: "#0a0f1e",
    icon: "#132947",
    iconBorder: "#3a7bd5",
  },
  yellow: {
    name: "Yellow",
    bg: "#1a1600",
    card: "#242000",
    border: "#3a3400",
    accent: "#e6c200",
    accentHover: "#c4a500",
    text: "#fff8cc",
    textMuted: "#aa9600",
    textDim: "#665c00",
    navBg: "#1a1600",
    headerBg: "#fff8cc",
    headerText: "#1a1600",
    icon: "#6e5e02",
    iconBorder: "#e6c200",
  },
  green: {
    name: "Green",
    bg: "#0a1a0f",
    card: "#112218",
    border: "#1a3824",
    accent: "#2ecc71",
    accentHover: "#25a85c",
    text: "#d4f5e2",
    textMuted: "#4a9960",
    textDim: "#2a5c3a",
    navBg: "#0a1a0f",
    headerBg: "#d4f5e2",
    headerText: "#0a1a0f",
    icon: "#104828",
    iconBorder: "#2ecc71",
  },
  purple: {
    name: "Purple",
    bg: "#100a1e",
    card: "#1a1028",
    border: "#2e1e4a",
    accent: "#9b59b6",
    accentHover: "#7d3f99",
    text: "#eedcff",
    textMuted: "#7a50aa",
    textDim: "#4a2a70",
    navBg: "#100a1e",
    headerBg: "#eedcff",
    headerText: "#100a1e",
    icon: "#4b2b57",
    iconBorder: "#9b59b6",
  },
  pink: {
    name: "Pink",
    bg: "#1f0818",
    card: "#281020",
    border: "#4a1e39",
    accent: "#c2276a",
    accentHover: "#c95788",
    text: "#ffdcf5",
    textMuted: "#bc6b96",
    textDim: "#743a5a",
    navBg: "#340d28",
    headerBg: "#ffdcf5",
    headerText: "#1e0a13",
    icon: "#572b45",
    iconBorder: "#b65983",
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("dark");
  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, themes }}>
      <div style={{
        "--bg":          theme.bg,
        "--card":        theme.card,
        "--border":      theme.border,
        "--accent":      theme.accent,
        "--accent-hover":theme.accentHover,
        "--text":        theme.text,
        "--text-muted":  theme.textMuted,
        "--text-dim":    theme.textDim,
        "--nav-bg":      theme.navBg,
        "--header-bg":   theme.headerBg,
        "--header-text": theme.headerText,
        "--icon":        theme.icon,
        "--iconBorder":  theme.iconBorder,
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}