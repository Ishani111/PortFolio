import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone 
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

          <a
            className="footer-link"
            href="mailto:you@email.com"
            title="Email"
          >
            <FaEnvelope size={16} />
            <span>ishani7bbsc@gmail.com</span>
          </a>

          <a
            className="footer-link"
            href="tel:+911234567890"
            title="Phone"
          >
            <FaPhone size={16} />
            <span>+91 9807105493</span>
          </a>
        </div>

      </div>
    </footer>
  );
}