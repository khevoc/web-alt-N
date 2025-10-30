import React from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "../Language";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <NavLink to="/" className="logo-link">NEO ALTAIR</NavLink>
      </div>

      <nav className="nav-links">
        <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/product" className={({isActive}) => isActive ? "active" : ""}>Collection</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink>
      </nav>

      <div className="nav-actions">
        <NavLink to="/cart" className="btn-cart">🛒</NavLink>
        <NavLink to="/checkout" className="btn-primary">Checkout</NavLink>
      </div>
      
    </header>
  );
}
