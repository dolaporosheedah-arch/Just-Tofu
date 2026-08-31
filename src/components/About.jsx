const PILLARS = [
  {
    icon: "🌱",
    title: "100% Organic",
    desc: "We source only certified non-GMO soybeans from trusted farms. No shortcuts, no compromise.",
  },
  {
    icon: "🔥",
    title: "Stone-Ground Fresh",
    desc: "Our tofu is ground and pressed every morning on-site using traditional stone-grinding methods.",
  },
  {
    icon: "🍃",
    title: "Plant-Forward",
    desc: "Every dish is thoughtfully crafted around plants. Nourishing, wholesome, and full of flavour.",
  },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Story Column */}
          <div className="about-story">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">This Isn&apos;t Just Tofu.</h2>
            <p className="about-text">
              Just Tofu was born from a simple belief: food made with care tastes
              better. We started with a single stone grinder, a small kitchen, and
              a deep respect for one humble ingredient.
            </p>
            <p className="about-text">
              Today, every dish we serve is a reflection of that same dedication.
              Our tofu is pressed fresh every morning from 100% organic, non-GMO
              soybeans — silky, bold, and alive with flavour. We don&apos;t cut
              corners. We don&apos;t compromise. We just make great tofu.
            </p>
            <p className="about-text">
              Whether you&apos;re here for our signature Tofu Pepper Soup or a
              quiet bowl of rice, we want you to leave feeling nourished — body
              and soul.
            </p>

            <div className="about-signature">
              <div className="signature-line">
                <span className="sig-name">Chef Min &amp; the Just Tofu Team</span>
                <span className="sig-title">Founder &amp; Head Chef</span>
              </div>
            </div>
          </div>

          {/* Pillars Column */}
          <div className="about-pillars">
            {PILLARS.map((p) => (
              <div key={p.title} className="pillar-card">
                <div className="pillar-icon">{p.icon}</div>
                <div className="pillar-body">
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}

            {/* Seating info */}
            <div className="seating-info-card">
              <h4>Seating Options</h4>
              <ul className="seating-list">
                <li>
                  <span className="seating-icon">🪑</span>
                  <div>
                    <strong>Classic Dining</strong>
                    <p>Traditional table seating for 2–6 guests</p>
                  </div>
                </li>
                <li>
                  <span className="seating-icon">🛋</span>
                  <div>
                    <strong>Cozy Low Table Banquette</strong>
                    <p>Low cushioned seating for an intimate experience</p>
                  </div>
                </li>
                <li>
                  <span className="seating-icon">🍵</span>
                  <div>
                    <strong>Counter Bar</strong>
                    <p>Watch the tofu being made fresh at our open kitchen bar</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
