import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./intro.css";
import myImage from './MyImage (2).jpeg';

function Intro() {
  const navigate = useNavigate();

  const skills = [
    { label: "React",              pct: 80 },
    { label: "JavaScript",         pct: 75 },
    { label: "CSS3",               pct: 85 },
    { label: "REST APIs",          pct: 70 },
    { label: "Responsive Design",  pct: 80 },
  ];

  return (
    <div className="intro-page">

      {/* ══ HERO SECTION ══════════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-inner">

          <div className="hero-text">
            <span className="hero-greeting">Hi, I'm</span>
            <h1 className="hero-name">{/* Your Name */}ISHANI</h1>
            <h2 className="hero-role">Frontend Developer</h2>
            <p className="hero-bio">
              {/* Your bio */}
              A passionate developer who builds small interactive
              applications using React — from tools like to-do lists
              and calculators to live APIs like weather and maps.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/home")}>
                View Projects
              </button>
              <a className="btn-outline" href="#contact">Contact Me</a>
            </div>

            <div className="hero-socials">
              <a className="hero-social" href="https://github.com/ishani111" target="_blank" rel="noreferrer">
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a className="hero-social" href="https://linkedin.com/in/ishani-dev" target="_blank" rel="noreferrer">
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="hero-avatar">
            <div className="avatar-ring">
                <img className="avatar-ring" src={myImage} alt="Description" />
              </div>
            <div className="avatar-tag">Open to Work</div>
          </div>

        </div>

        <div className="hero-scroll" onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* ══ ABOUT SECTION ═════════════════════════════════════════════════════ */}
      <section className="about-section" id="about">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h3 className="section-title">My Introduction</h3>
        </div>

        <div className="about-grid">
          <div className="about-stats">
            {[
              { num: "10+", desc: "Projects Built"     },
              { num: "3+",  desc: "APIs Integrated"    },
              { num: "1+",  desc: "Years of Learning"  },
            ].map(({ num, desc }) => (
              <div key={desc} className="about-stat">
                <span className="about-stat-num">{num}</span>
                <span className="about-stat-desc">{desc}</span>
              </div>
            ))}
          </div>

          <div className="about-content">
            <p className="about-text">
              {/* Your about text */}
              I build small interactive applications using React.
              This portfolio is a collection of my experiments and learning —
              each project taught me something new about frontend development.
            </p>
          </div>
        </div>
      </section>

      {/* ══ SKILLS SECTION ════════════════════════════════════════════════════ */}
      <section className="skills-section" id="skills">
        <div className="section-header">
          <span className="section-tag">Skills</span>
          <h3 className="section-title">My Technical Level</h3>
        </div>

        <div className="skills-grid">
          {skills.map(({ label, pct }) => (
            <div key={label} className="skill-item">
              <div className="skill-top">
                <span className="skill-label">{label}</span>
                <span className="skill-pct">{pct}%</span>
              </div>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ EDUCATION SECTION ═════════════════════════════════════════════════ */}
      <section className="edu-section" id="education">
        <div className="section-header">
          <span className="section-tag">Education</span>
          <h3 className="section-title">My Education Journey</h3>
        </div>

        <div className="edu-timeline">
          {[
            {
              degree: "BTECH Computer Science",       // e.g. B.Tech Computer Science
              school: "United College Of Engineering And Research",   // e.g. VIT Vellore
              year:   "2024 – ongoing",
              detail: "SGPA upto now: 8.2", // e.g. CGPA, subjects
            },
            {
              degree: "Inter college",
              school: "Bethany Convent School",
              year:   "2023 – 2024",
              detail: "76%",
            },
          ].map(({ degree, school, year, detail }, i) => (
            <div key={i} className="edu-item">
              <div className="edu-dot" />
              <div className="edu-body">
                <div className="edu-year">{year}</div>
                <div className="edu-degree">{degree}</div>
                <div className="edu-school">{school}</div>
                <div className="edu-detail">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONTACT SECTION ═══════════════════════════════════════════════════ */}
      <section className="contact-section" id="contact">
        <div className="section-header">
          <span className="section-tag">Contact</span>
          <h3 className="section-title">Get In Touch</h3>
        </div>

        <div className="contact-grid">
          {[
            { label: "LinkedIn", value: "linkedin.com/in/ishani-dev",    href: "https://linkedin.com/in/ishani-dev" },
            { label: "GitHub",   value: "github.com/ishani111",   href: "https://github.com/ishani111"  },
          ].map(({ label, value, href }) => (
            <a key={label} className="contact-card" href={href} target="_blank" rel="noreferrer">
              <span className="contact-label">{label}</span>
              <span className="contact-value">{value}</span>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Intro;