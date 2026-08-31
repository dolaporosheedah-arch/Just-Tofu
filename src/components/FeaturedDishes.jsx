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
            <article
              key={item.id}
              className={`featured-card${item.isSignature ? " signature-featured-card" : ""}`}
            >
              <div
                className="featured-image-wrap"
                onClick={() => setSelectedDish(item)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.name}`}
                onKeyDown={(e) => e.key === "Enter" && setSelectedDish(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="featured-image"
                  loading="lazy"
                />
                {item.badge && (
                  <span
                    className={`featured-badge${item.isSignature ? " signature-badge" : ""}`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.spiceLevel > 0 && (
                  <span className="spice-tag">{"🌶️".repeat(item.spiceLevel)}</span>
                )}
              </div>

              <div className="featured-content">
                <div className="featured-header">
                  <h3
                    className="featured-title"
                    onClick={() => setSelectedDish(item)}
                  >
                    {item.name}
                  </h3>
                  <span className="featured-price">${item.price.toFixed(2)}</span>
                </div>

                <p className="featured-desc">{item.description}</p>

                <div className="dietary-pills" style={{ marginBottom: "0.25rem" }}>
                  {item.dietary.slice(0, 2).map((d) => (
                    <span key={d} className="diet-pill">
                      {d}
                    </span>
                  ))}
                </div>

                <div className="featured-footer">
                  <button
                    type="button"
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
                      strokeWidth="2.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="featured-details-link"
                    onClick={() => setSelectedDish(item)}
                    title="View Details"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
}
