import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "../Language";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  return (
    <header className="navbar">
      <div className="logo">
        <NavLink to="/" className="logo-link">NEO ALTAIR</NavLink>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/product" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}>Collection</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}>About</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink>
        
      </nav>

      <div className="nav-actions">
        <NavLink to="/cart" className="btn-cart">🛒</NavLink>
        <NavLink to="/checkout" className="btn-primary">Checkout</NavLink>
      </div>

    </header>
  );
}
