export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <a
              href="#home"
              className="brand-logo"
              onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
            >
              <img src="/images/logo.png" alt="JUST TOFU Logo" className="brand-logo-img" />
              <div className="brand-logo-text">
                <span className="brand-name">JUST TOFU</span>
                <span className="brand-tagline-sub">FRESH &bull; DELICIOUS &bull; NOURISHING</span>
              </div>
            </a>
            <p className="footer-brand-desc">
              This isn&apos;t just tofu. This is JUST TOFU. Artisanal plant-based
              cuisine crafted with love and served with pride.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <nav>
              {[
                ["home", "Home"],
                ["featured", "Our Tofu"],
                ["menu", "Full Menu"],
                ["about", "Our Story"],
                ["gallery", "Gallery"],
                ["reservations", "Reservations"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Visit Us</h4>
            <p>📍 12 Artisan Street, Tofu Quarter<br />New York, NY 10001</p>
            <p>📞 (012) 345-6789</p>
            <p>✉️ hello@justtofu.com</p>
            <p>🕐 Mon–Fri: 11:30 AM – 10:00 PM</p>
            <p>🕐 Sat–Sun: 11:00 AM – 10:30 PM</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Just Tofu. All rights reserved.
          </p>
          <p>Made with 🌱 and organic soybeans.</p>
        </div>
      </div>
    </footer>
  );
}
