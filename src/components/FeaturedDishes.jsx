import { useState } from "react";
import { MENU_DATA, FEATURED_IDS } from "../data/menuData";
import { useCart } from "../context/CartContext";
import DishModal from "./ui/DishModal";

const featuredItems = FEATURED_IDS.map((id) =>
  MENU_DATA.find((item) => item.id === id)
).filter(Boolean);

export default function FeaturedDishes() {
  const { addToCart } = useCart();
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <section className="featured-section" id="featured">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">House Specialties</span>
          <h2 className="section-title">Our Tofu</h2>
          <p className="section-subtitle">
            Handcrafted daily from pure organic soybeans. Experience the rich texture and versatile culinary magic of our signature creations.
          </p>
        </div>

        <div className="featured-grid" id="featuredDishesGrid">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className={`featured-card${item.isSignature ? " featured-signature-card" : ""}`}
            >
              <div
                className="featured-card-img-wrap"
                onClick={() => setSelectedDish(item)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="featured-card-img"
                  loading="lazy"
                />
                {item.badge && (
                  <span
                    className={`featured-badge${item.isSignature ? " badge-signature" : ""}`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.spiceLevel > 0 && (
                  <span className="spice-tag">{"🌶️".repeat(item.spiceLevel)}</span>
                )}
              </div>
              <div className="featured-card-body">
                <div className="featured-card-header">
                  <span className="featured-card-category">{item.category}</span>
                  <span className="featured-card-price">${item.price.toFixed(2)}</span>
                </div>
                <h3
                  className="featured-card-title"
                  onClick={() => setSelectedDish(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.name}
                </h3>
                <p className="featured-card-desc">{item.description}</p>
                <div className="featured-card-footer">
                  <button
                    className="btn btn-sm-order"
                    onClick={() => addToCart(item)}
                    title="Add to Order"
                  >
                    <span>Add to Order</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <button
                    className="featured-info-btn"
                    onClick={() => setSelectedDish(item)}
                    title="View Details"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
}
