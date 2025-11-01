import React from "react";
import "./Footer.css";
import { Github, Twitter, Instagram } from "lucide-react";
import LanguageSwitcher from "../Language.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2 className="footer-title">Neo Altair</h2>
          <p className="footer-subtitle">Digital Art</p>
        </div>

        <div className="footer-center">
          <p className="footer-copy">
            © {new Date().getFullYear()} Neo Altair. All rights reserved.
          </p>
        </div>

        <div className="footer-right">
          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
          </div>          
        </div>
      </div>
      <div className="language-footer">
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
