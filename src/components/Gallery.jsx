import { useState } from "react";
import { GALLERY_ITEMS } from "../data/menuData";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = () => {
    setLightboxIndex(
      (current) => (current - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  };

  const nextLightbox = () => {
    setLightboxIndex((current) => (current + 1) % GALLERY_ITEMS.length);
  };

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Visual Feast</span>
          <h2 className="section-title">The JUST TOFU Experience</h2>
          <p className="section-subtitle">
            Glimpse into our artisanal dishes, serene dining atmosphere, and vibrant food presentations.
          </p>
        </div>

        <div className="gallery-grid" id="galleryGrid">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => openLightbox(index)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="gallery-tag">{item.tag}</span>
                <h4 className="gallery-title">{item.title}</h4>
                <p className="gallery-subtitle">{item.subtitle}</p>
                <span className="gallery-zoom-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="lightbox-modal active" id="galleryLightbox">
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close Lightbox"
            >
              &times;
            </button>
            <button
              className="lightbox-nav-btn lightbox-prev"
              onClick={prevLightbox}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <button
              className="lightbox-nav-btn lightbox-next"
              onClick={nextLightbox}
              aria-label="Next image"
            >
              &#10095;
            </button>

            <div className="lightbox-img-wrap">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="lightbox-img"
                id="lightboxImg"
              />
            </div>
            <div className="lightbox-caption">
              <h4 id="lightboxTitle">{activeItem.title}</h4>
              <p id="lightboxSubtitle">{activeItem.subtitle}</p>
              <span
                id="lightboxCounter"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-gold)",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
