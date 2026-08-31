export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Find Us</span>
          <h2 className="section-title">Visit Just Tofu</h2>
          <p className="section-subtitle">
            We&apos;d love to have you. Come in, sit down, and enjoy.
          </p>
        </div>

        <div className="contact-grid">
          {/* Address */}
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Our Location</h3>
            <p>12 Artisan Street, Tofu Quarter</p>
            <p>Downtown District</p>
            <p>New York, NY 10001</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Get Directions →
            </a>
          </div>

          {/* Hours */}
          <div className="contact-card">
            <div className="contact-icon">🕐</div>
            <h3>Opening Hours</h3>
            <ul className="hours-list">
              <li>
                <span>Mon – Fri</span>
                <span>11:30 AM – 10:00 PM</span>
              </li>
              <li>
                <span>Saturday</span>
                <span>11:00 AM – 10:30 PM</span>
              </li>
              <li>
                <span>Sunday</span>
                <span>11:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Phone & Email */}
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Get in Touch</h3>
            <p>
              <a href="tel:+10123456789" className="contact-link">
                (012) 345-6789
              </a>
            </p>
            <p>
              <a href="mailto:hello@justtofu.com" className="contact-link">
                hello@justtofu.com
              </a>
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram" className="social-link">Instagram</a>
              <a href="#" aria-label="Facebook" className="social-link">Facebook</a>
              <a href="#" aria-label="Twitter" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
