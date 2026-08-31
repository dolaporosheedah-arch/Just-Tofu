import { useState, useMemo } from "react";
import { MENU_DATA, MENU_CATEGORIES } from "../data/menuData";
import { useCart } from "../context/CartContext";
import DishModal from "./ui/DishModal";

export default function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [addedIds, setAddedIds] = useState({});

  const filteredItems = useMemo(() => {
    return MENU_DATA.filter((item) => {
      const matchCat =
        activeCategory === "ALL" || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAdd = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(
      () => setAddedIds((prev) => ({ ...prev, [item.id]: false })),
      1200
    );
  };

  return (
    <section className="section menu-section" id="menu">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Full Menu</span>
          <h2 className="section-title">Our Complete Menu</h2>
          <p className="section-subtitle">
            Every dish crafted fresh. Every flavour intentional.
          </p>
        </div>

        {/* Search Bar */}
        <div className="menu-search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            id="menuSearchInput"
            className="menu-search"
            placeholder="Search dishes, ingredients or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search menu"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="menu-filters" role="tablist" aria-label="Menu categories">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="menu-results-count">
          Showing {filteredItems.length} dish{filteredItems.length !== 1 ? "es" : ""}
          {searchQuery ? ` for "${searchQuery}"` : ""}
        </p>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="menu-grid" id="menuGrid">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className={`menu-card${item.isSignature ? " signature" : ""}`}
                onClick={() => setSelectedDish(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedDish(item)}
              >
                <div className="menu-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-card-img"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="menu-card-badge">{item.badge}</span>
                  )}
                </div>

                <div className="menu-card-body">
                  <div className="menu-card-header">
                    <h3 className="menu-card-name">{item.name}</h3>
                    <span className="menu-card-price">${item.price.toFixed(2)}</span>
                  </div>

                  <p className="menu-card-desc">{item.description}</p>

                  <div className="menu-card-tags">
                    {item.dietary.map((d) => (
                      <span key={d} className="dietary-tag">{d}</span>
                    ))}
                  </div>

                  <button
                    className={`btn btn-add-to-cart${addedIds[item.id] ? " added" : ""}`}
                    onClick={(e) => handleAdd(e, item)}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    {addedIds[item.id] ? "✓ Added!" : "+ Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="menu-empty" id="menuEmpty">
            <span>🍃</span>
            <p>No dishes found. Try a different search or category.</p>
            <button
              className="btn btn-outline"
              onClick={() => { setSearchQuery(""); setActiveCategory("ALL"); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
}
