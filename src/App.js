import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Signin from "./login";
import Stopwatch from "./stopwatch";
import Counter from "./counter";
import ThemeToggle from "./ThemeToggle";
import Registration from "./Registration";
import Factorial from "./Factorial";
import Home from "./home";
import Todo from "./todo";
import Student from "./student";
import Weather from "./weather";
import MapFree from "./map";
import "./App.css";
import Calculator from "./calculator";
import Intro from "./intropage";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/stopwatch", label: "Stopwatch" },
  { path: "/login", label: "Login" },
  { path: "/Registration", label: "Register" },
  { path: "/Todo", label: "To-do" },
  { path: "/Factorial", label: "Factorial" },
  { path: "/ThemeToggle", label: "Theme" },
  { path: "/counter", label: "Counter" },
  { path: "/Student", label: "Student" },
  { path: "/Weather", label: "Weather" },
  { path: "/Map", label: "Map" },
  { path: "/Calculator", label: "Calculator" },
  {path: "/", label:"Intropage"},
];

function Layout() {
  const { theme } = useTheme();

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", transition: "background 0.3s" }}>
      <nav className="navbar" style={{ background: theme.navBg, borderBottomColor: theme.accent }}>
        <div className="nav-brand">
          <Link className="nav-logo" to="/" style={{ background: theme.accent, color: theme.headerText }}>
            Ishani
          </Link>
        </div>
        <div className="nav-links">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              style={({ isActive }) => ({
                color: isActive ? theme.accent : theme.textMuted,
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/ThemeToggle" element={<ThemeToggle />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Factorial" element={<Factorial />} />
        <Route path="/Todo" element={<Todo />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Map" element={<MapFree />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/" element={<Intro/>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;