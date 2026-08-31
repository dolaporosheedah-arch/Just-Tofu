import { useState, useMemo } from "react";
import { MENU_DATA, MENU_CATEGORIES } from "../data/menuData";
import { useCart } from "../context/CartContext";
import DishModal from "./ui/DishModal";

export default function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);

  const filteredItems = useMemo(() => {
    return MENU_DATA.filter((item) => {
      const matchCat =
        activeCategory === "ALL" || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Curated Menu</span>
          <h2 className="section-title">Explore Our Full Menu</h2>
          <p className="section-subtitle">
            From steaming stone-pot stews to chewy handcrafted noodles and refreshing artisanal drinks.
          </p>
        </div>

        {/* Menu Category Filter & Search Bar */}
        <div className="menu-filter-container">
          <div className="menu-categories-bar" role="tablist" aria-label="Menu Categories">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`menu-cat-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-search-wrap">
            <span className="menu-search-icon">🔍</span>
            <input
              type="text"
              id="menuSearchInput"
              className="menu-search-input"
              placeholder="Search dish name, ingredient, or dietary..."
              aria-label="Search Menu"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="menu-items-grid" id="menuItemsGrid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`menu-card${item.isSignature ? " menu-signature-card" : ""}`}
              >
                <div
                  className="menu-card-img-wrap"
                  onClick={() => setSelectedDish(item)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-card-img"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span
                      className={`menu-card-badge${item.isSignature ? " badge-signature" : ""}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.spiceLevel > 0 && (
                    <span className="spice-tag">{"🌶️".repeat(item.spiceLevel)}</span>
                  )}
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-top">
                    <span className="menu-card-category">{item.category}</span>
                    <span className="menu-card-calories">{item.calories || ""}</span>
                  </div>
                  <h4
                    className="menu-card-title"
                    onClick={() => setSelectedDish(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </h4>
                  <p className="menu-card-desc">{item.description}</p>
                  <div className="menu-card-bottom">
                    <span className="menu-card-price">${item.price.toFixed(2)}</span>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="menu-no-results" id="menuNoResults">
            <h3>No dishes found</h3>
            <p>Try searching for another dish or selecting a different category tab.</p>
          </div>
        )}
      </div>

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
}
