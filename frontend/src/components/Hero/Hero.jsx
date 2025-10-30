import React, { useState, useEffect } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "The New Age of Blockchain Art",
    subtitle: "Collect, trade, and own the future of creativity.",
    image: "https://images.unsplash.com/photo-1648737966083-9a3d5a32d3d7?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 2,
    title: "Neo Altair Collection",
    subtitle: "Exclusive digital assets reimagined as luxury art.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 3,
    title: "Invest in Digital Luxury",
    subtitle: "A blend of technology and timeless aesthetics.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 4,
    title: "Beyond the Canvas",
    subtitle: "Where art meets blockchain innovation.",
    image: "https://images.unsplash.com/photo-1620325892749-50b8b7d2ecca?auto=format&fit=crop&w=1600&q=80"
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${current.image})` }}
    >
      <div className="overlay" />
      <div className="hero-content">
        <h1>{current.title}</h1>
        <p>{current.subtitle}</p>
        <Link to="/product" className="hero-btn">
          Explore Now
        </Link>
      </div>

      <div className="dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`dot ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
