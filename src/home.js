import { useNavigate } from "react-router-dom";
import "./home.css";
import {
  FaStopwatch,
  FaUser,
  FaUserPlus,
  FaCheckSquare,
  FaCloud,
  FaMapMarkerAlt,
  FaSun,
  FaPlus,
  FaUserGraduate
} from "react-icons/fa";
import { MdCalculate } from "react-icons/md";

const projects = [
  { path: "/stopwatch", label: "Stopwatch", icon: FaStopwatch },
  { path: "/login", label: "Login", icon: FaUser },
  { path: "/registration", label: "Registration", icon: FaUserPlus },
  { path: "/todo", label: "To-do List", icon: FaCheckSquare },
  { path: "/factorial", label: "Factorial", icon: MdCalculate },
  { path: "/ThemeToggle", label: "Theme Toggle", icon: FaSun },
  { path: "/counter", label: "Counter", icon: FaPlus },
  { path: "/Student", label: "Student Management", icon: FaUserGraduate },
  { path: "/Weather", label: "Weather", icon: FaCloud },
  { path: "/Map", label: "Map", icon: FaMapMarkerAlt },
  { path: "/Calculator", label: "Calculator", icon: MdCalculate },
];;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <header className="site-header">
        <h1>PORTFOLIO</h1>
        <span className="header-sub">React Projects</span>
      </header>

      <p className="section-label">My Projects</p>

      <div className="grid">
        {projects.map(({ path, label, icon: Icon}) => (
          <button key={path} className="card" onClick={() => navigate(path)}>
            <div className="card-icon" ><Icon className="icon" /></div>
            <span className="card-title">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;