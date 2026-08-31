import { useState } from "react";
import { GALLERY_ITEMS } from "../data/menuData";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () =>
    setLightboxIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  const nextImage = () =>
    setLightboxIndex((i) => (i + 1) % GALLERY_ITEMS.length);

  // Keyboard navigation for lightbox
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeLightbox();
  };

  const activeLightbox = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Gallery</span>
          <h2 className="section-title">A Feast for the Eyes</h2>
          <p className="section-subtitle">
            From kitchen craft to table art — every plate, a story.
          </p>
        </div>

        <div className="gallery-grid" id="galleryGrid">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-tag">{item.tag}</span>
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeLightbox && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              &times;
            </button>

            <button
              className="lightbox-nav prev"
              onClick={prevImage}
              aria-label="Previous image"
            >
              &#8249;
            </button>

            <img
              src={activeLightbox.image}
              alt={activeLightbox.title}
              className="lightbox-img"
            />

            <button
              className="lightbox-nav next"
              onClick={nextImage}
              aria-label="Next image"
            >
              &#8250;
            </button>

            <div className="lightbox-caption">
              <span className="gallery-tag">{activeLightbox.tag}</span>
              <h3>{activeLightbox.title}</h3>
              <p>{activeLightbox.subtitle}</p>
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
