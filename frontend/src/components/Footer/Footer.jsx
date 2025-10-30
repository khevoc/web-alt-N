import React from "react";
import "./Footer.css";
import LanguageSwitcher from "../Language.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Neo Altair — Blockchain & Digital Art</p>

      <div className="ml-6">
          <LanguageSwitcher />
        </div>
    </footer>
  );
}
