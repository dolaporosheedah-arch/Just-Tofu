import { useState, useEffect } from "react";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");

  // Live opening hours check
  useEffect(() => {
    const checkHours = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMins = hours * 60 + minutes;
      const openMins = 11 * 60 + 30;  // 11:30 AM
      const closeMins = 22 * 60;       // 10:00 PM
      const open = totalMins >= openMins && totalMins < closeMins;
      setIsOpen(open);
      setStatusText(open ? "Open Now · Closes 10 PM" : "Opens at 11:30 AM");
    };
    checkHours();
    const interval = setInterval(checkHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg-overlay" />
      <div className="hero-content">
        {/* Live Status Badge */}
        <div className={`hero-status-badge ${isOpen ? "open" : "closed"}`}>
          <span className={`status-dot ${isOpen ? "open" : "closed"}`} />
          <span>{statusText}</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          THIS ISN&apos;T JUST TOFU.<br />
          <span className="hero-title-accent">THIS IS JUST TOFU.</span>
        </h1>

        <p className="hero-subtitle">
          Artisanal tofu crafted fresh daily from 100% organic non-GMO soybeans.
          Bold flavors. Nourishing bowls. Unforgettable every bite.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button
            className="btn btn-primary btn-lg"
            id="heroOrderBtn"
            onClick={() => scrollTo("menu")}
          >
            <span>🍽</span>
            <span>Explore Our Menu</span>
          </button>
          <button
            className="btn btn-outline btn-lg"
            id="heroReserveBtn"
            onClick={() => scrollTo("reservations")}
          >
            <span>📅</span>
            <span>Book a Table</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Organic Non-GMO</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">Fresh</span>
            <span className="stat-label">Made Daily</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Signature Dishes</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
}
