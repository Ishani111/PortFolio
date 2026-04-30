import { 
  FaGithub, 
  FaLinkedin, 
} from "react-icons/fa";import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <span className="footer-name">Ishani</span>

        <div className="footer-links">
        <a 
            className="footer-link"
            href="https://github.com/ishani111"
            target="_blank"
            rel="noreferrer"
            title="Github"
          >
            <FaGithub size={16} />
            <span>Github</span>
          </a>

          <a
            className="footer-link"
            href="https://linkedin.com/in/ishani-dev"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin size={16} />
            <span>LinkedIn</span>
          </a>
        </div>

      </div>
    </footer>
  );
}