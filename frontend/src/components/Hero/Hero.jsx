import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Hero.css";
import hero1 from "../../assets/hero-5.png";
import hero2 from "../../assets/hero.png";
import hero3 from "../../assets/hero-2.png";
import hero4 from "../../assets/hero-4.png";

const slides = [
  {
    id: 1,
    title: "The New Age of Blockchain Art",
    subtitle: "Collect, trade, and own the future of creativity.",
    image: hero1,
  },
  {
    id: 2,
    title: "Neo Altair Collection",
    subtitle: "Exclusive digital assets reimagined as luxury art.",
    image: hero2,
  },
  {
    id: 3,
    title: "Invest in Digital Luxury",
    subtitle: "A blend of technology and timeless aesthetics.",
    image: hero3,
  },
  {
    id: 4,
    title: "Beyond the Canvas",
    subtitle: "Where art meets blockchain innovation.",
    image: hero4,
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const intervalRef = useRef(null);

  const nextSlide = () => {setIndex((prev) => (prev + 1) % slides.length);resetInterval();};
  const prevSlide = () => {setIndex((prev) => (prev - 1 + slides.length) % slides.length);resetInterval();};

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };


  // Auto slide
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Swipe events
  const handleTouchStart = (e) => (touchStartX.current = e.targetTouches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    resetInterval();
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide(); // swipe left
    if (distance < -50) prevSlide(); // swipe right
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="hero-section"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          className="hero-slide"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${slides[index].image})`,
          }}
        >
          <div className="hero-overlay">
            <motion.div
              className="hero-text"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1>{slides[index].title}</h1>
              <p>{slides[index].subtitle}</p>
              <a href="/product" className="hero-btn">
                Explore Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="hero-controls">
        <button onClick={prevSlide} className="nav-btn left">
          <ChevronLeft size={32} />
        </button>
        <div className="dots">
          {slides.map((_, i) => (
            <div key={i} className={`dot ${i === index ? "active" : ""}`} />
          ))}
        </div>
        <button onClick={nextSlide} className="nav-btn right">
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
}
