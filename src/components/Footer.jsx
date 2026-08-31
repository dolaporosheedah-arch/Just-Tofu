export default function Footer() {
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
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-wrap">
            <a
              href="#home"
              className="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
            >
              <img src="/images/logo.png" alt="JUST TOFU Logo" className="brand-logo-img" />
              <div className="brand-logo-text">
                <span className="brand-name">JUST TOFU</span>
                <span className="brand-tagline-sub">FRESH &bull; DELICIOUS &bull; NOURISHING</span>
              </div>
            </a>
            <p className="footer-tagline">“This isn't just tofu. This is JUST TOFU.”</p>
            <p className="footer-desc">
              Organic, handcrafted artisanal tofu kitchen. Fresh, delicious, nourishing comfort in every bite.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-links">
              <a
                href="#home"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("home");
                }}
              >
                Home
              </a>
              <a
                href="#featured"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("featured");
                }}
              >
                Our Tofu
              </a>
              <a
                href="#menu"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("menu");
                }}
              >
                Full Menu
              </a>
              <a
                href="#about"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("about");
                }}
              >
                Our Story
              </a>
              <a
                href="#gallery"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("gallery");
                }}
              >
                Photo Gallery
              </a>
              <a
                href="#reservations"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("reservations");
                }}
              >
                Reservations
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Hours</h4>
            <div className="footer-hours-list">
              <div>
                <strong>Monday &ndash; Friday</strong>
                <br />
                11:30 AM &ndash; 10:00 PM
              </div>
              <div>
                <strong>Saturday &ndash; Sunday</strong>
                <br />
                11:00 AM &ndash; 10:30 PM
              </div>
              <div style={{ marginTop: "0.4rem", color: "var(--color-gold)" }}>
                * Kitchen closes 30m prior
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Stay Connected</h4>
            <p className="footer-desc" style={{ marginBottom: "1rem" }}>
              Follow our daily fresh soy batches and culinary specials.
            </p>
            <div className="footer-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                📷 Instagram: @justtofu.kitchen
              </a>
              <a
                href="https://wa.me/15558638638"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                💬 WhatsApp: +1 (555) 863-8638
              </a>
              <a href="tel:+15558638638" className="footer-link">
                📞 Phone: +1 (555) 863-TOFU
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; 2026 JUST TOFU. All rights reserved. Crafted with care and organic soybeans.</div>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <a
              href="#home"
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#home"
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
            >
              Terms of Service
            </a>
            <a
              href="#reservations"
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("reservations");
              }}
            >
              Book a Table
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
