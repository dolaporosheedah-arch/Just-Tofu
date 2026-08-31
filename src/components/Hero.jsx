export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <span>🌱</span> 100% Organic Non-GMO Soybeans &bull; Crafted Daily
          </div>
          <h1 className="hero-title">JUST TOFU</h1>
          <p className="hero-tagline">“This isn't just tofu. This is JUST TOFU.”</p>
          <p className="hero-desc">
            Step into our warm artisanal kitchen. Fresh, velvety, crispy, and comforting tofu dishes reimagined with bold wholesome flavors.
          </p>
          <div className="hero-actions">
            <a
              href="#menu"
              className="btn btn-accent"
              id="heroOrderNowBtn"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("menu");
              }}
            >
              <span>ORDER NOW</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#menu"
              className="btn btn-outline"
              id="heroViewMenuBtn"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("menu");
              }}
            >
              VIEW MENU
            </a>
          </div>
          <div className="hero-highlights">
            <div className="hero-highlight-item">
              <div className="highlight-icon">✓</div>
              <span>Stoneground Fresh Daily</span>
            </div>
            <div className="hero-highlight-item">
              <div className="highlight-icon">🍲</div>
              <span>Signature Pepper Broth</span>
            </div>
            <div className="hero-highlight-item">
              <div className="highlight-icon">✨</div>
              <span>Cozy Dining Vibe</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="/images/hero_tofu_spread.jpg"
              alt="Artisanal JUST TOFU feast with bubbling soup and crispy tofu"
              className="hero-img"
              id="heroFoodImg"
            />
            <div className="hero-floating-badge">
              <div className="floating-badge-icon">🍲</div>
              <div>
                <h4 className="floating-badge-title">Chef's Signature</h4>
                <p className="floating-badge-subtitle">Stone Pot Tofu Pepper Soup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
