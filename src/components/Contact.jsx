export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Visit Us &amp; Connect</h2>
          <p className="section-subtitle">
            Drop by for a comforting bowl, place a quick takeaway order, or chat with us on WhatsApp.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-info-card">
            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-val">
                    128 Sylvan Blossom Way, Suite 400
                    <br />
                    Central Arts District
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div>
                  <div className="contact-label">Opening Hours</div>
                  <div className="contact-val" style={{ marginBottom: "0.35rem" }}>
                    Mon &ndash; Sun: 11:30 AM &ndash; 10:00 PM
                  </div>
                  <span className="live-status-badge">
                    <span className="status-dot online"></span> Open Now &bull; Closes 10:00 PM
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Phone &amp; Inquiries</div>
                  <div className="contact-val">
                    <a href="tel:+15558638638" style={{ color: "var(--color-primary)" }}>
                      +1 (555) 863-TOFU
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <div className="contact-label">WhatsApp Direct</div>
                  <div className="contact-val">
                    <a
                      href="https://wa.me/15558638638"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--color-accent)" }}
                    >
                      +1 (555) 863-8638 (Fast Response)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-social-links">
              <a
                href="https://wa.me/15558638638"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp-btn"
              >
                <span>💬 WhatsApp</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
              >
                <span>📷 @justtofu.kitchen</span>
              </a>
            </div>
          </div>

          {/* Stylized Map Embed */}
          <div className="contact-map-card">
            <iframe
              className="map-embed"
              title="JUST TOFU Restaurant Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192837380967!2d-122.42067968468205!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sHayes%20Valley%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
