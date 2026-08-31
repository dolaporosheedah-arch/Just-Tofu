import { useState } from "react";
import { MENU_DATA, FEATURED_IDS } from "../data/menuData";
import { useCart } from "../context/CartContext";
import DishModal from "./ui/DishModal";

const featuredItems = MENU_DATA.filter((item) => FEATURED_IDS.includes(item.id));

function SpiceIndicator({ level }) {
  return (
    <div className="spice-indicator" aria-label={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`spice-dot${i <= level ? " active" : ""}`} />
      ))}
    </div>
  );
}

function DishCard({ item, onOpenModal }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className={`dish-card${item.isSignature ? " signature" : ""}`}
      onClick={() => onOpenModal(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpenModal(item)}
    >
      <div className="dish-card-image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="dish-card-image"
          loading="lazy"
        />
        <div className="dish-card-overlay" />
        {item.badge && <span className="dish-badge">{item.badge}</span>}
        <div className="dish-card-tags">
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="dish-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="dish-card-body">
        <h3 className="dish-name">{item.name}</h3>
        <p className="dish-desc">{item.description}</p>

        <div className="dish-meta">
          <span className="dish-calories">{item.calories}</span>
          {item.spiceLevel > 0 && <SpiceIndicator level={item.spiceLevel} />}
        </div>

        <div className="dish-footer">
          <span className="dish-price">${item.price.toFixed(2)}</span>
          <button
            className={`btn btn-add-to-cart${added ? " added" : ""}`}
            onClick={handleAdd}
            aria-label={`Add ${item.name} to cart`}
          >
            {added ? "✓ Added!" : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedDishes() {
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <section className="section featured-section" id="featured">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Tofu</span>
          <h2 className="section-title">Featured Dishes</h2>
          <p className="section-subtitle">
            Handcrafted with care. Each dish tells the story of our passion for
            pure, artisanal tofu.
          </p>
        </div>

        <div className="dishes-grid" id="featuredGrid">
          {featuredItems.map((item) => (
            <DishCard
              key={item.id}
              item={item}
              onOpenModal={setSelectedDish}
            />
          ))}
        </div>
      </div>

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
}
