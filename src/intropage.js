import { useNavigate } from "react-router-dom";
import "./intro.css";

function Intro() {
  const navigate = useNavigate();
  
  return (
    <div className="intro-page">
      <div className="intro-card">
        
        <div className="intro-header">
          <h1 className="intro-name">Ishani</h1>
          <p className="intro-role">
            <span>Frontend Developer</span> based in India
          </p>
        </div>
        
        <p className="intro-desc">
          I build small interactive applications using React — from tools like
          to-do lists and calculators to APIs like weather and maps.  
          This portfolio is a collection of my experiments and learning.
        </p>
        
        <div className="divider"></div>
        
        <div className="skills-section">
          <div className="skills-label">Core Skills</div>
          <div className="skills-badges">
            <span className="badge">React</span>
            <span className="badge">JavaScript</span>
            <span className="badge">CSS3</span>
            <span className="badge">REST APIs</span>
            <span className="badge">Responsive Design</span>
          </div>
        </div>
        
        <div className="intro-buttons">
          <button onClick={() => navigate("/home")}>
            View Projects
          </button>
          <button 
            className="outline" 
            onClick={() => window.open("https://linkedin.com/in/ishani111", "_blank")}
          >
            LinkedIn
          </button>
          <button 
            className="outline"
            onClick={() => window.open("https://github.com/Ishani111", "_blank")}
          >
            GitHub
          </button>
          <button 
            className="outline"
            onClick={() => window.location.href = "mailto:your.email@example.com"}
          >
            Email
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Intro;