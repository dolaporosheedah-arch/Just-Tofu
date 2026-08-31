export default function About() {
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
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-images-composition">
          <img
            src="/images/hero_tofu_spread.jpg"
            alt="Dining table with artisan tofu dishes"
            className="about-img-main"
          />
          <img
            src="/images/tofu_pepper_soup.jpg"
            alt="Bubbling Tofu Pepper Soup pot"
            className="about-img-secondary"
          />
        </div>

        <div className="about-content">
          <span className="section-tag">Our Story</span>
          <h2 className="about-title">
            Not Just Tofu.
            <br />
            An Everyday Culinary Art.
          </h2>
          <p className="about-lead">
            “We believe tofu is a blank canvas for pure comfort, deep flavor, and wholesome joy.”
          </p>
          <p className="about-text">
            At <strong>JUST TOFU</strong>, we set out to prove that tofu isn't just an alternative — it's the main event. Inspired by wholesome artisanal cooking traditions, we stone-grind 100% organic non-GMO soybeans every single morning. Whether seared to a golden crisp, pan-braised in savory chili reduction, or bubbling in our legendary stone-pot pepper soup, every dish is crafted to delight.
          </p>

          <div className="about-pillars">
            <div className="pillar-card">
              <div className="pillar-icon">🌱</div>
              <h4 className="pillar-title">Crafted Fresh Daily</h4>
              <p className="pillar-desc">
                Stoneground in-house every morning without additives or preservatives.
              </p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon">🥢</div>
              <h4 className="pillar-title">Bold Artisan Flavors</h4>
              <p className="pillar-desc">
                Infused with aromatic broths, savory glazes, and toasted sesame oils.
              </p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon">✨</div>
              <h4 className="pillar-title">Warm &amp; Cozy Ambiance</h4>
              <p className="pillar-desc">
                A peaceful setting designed for connection, comfort, and mindful dining.
              </p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon">💚</div>
              <h4 className="pillar-title">Nourishing &amp; Clean</h4>
              <p className="pillar-desc">
                Packed with clean plant protein and vibrant seasonal ingredients.
              </p>
            </div>
          </div>

          <a
            href="#reservations"
            className="btn btn-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={(e) => {
              e.preventDefault();
              scrollTo("reservations");
            }}
          >
            BOOK A TABLE
          </a>
        </div>
      </div>
    </section>
  );
}
