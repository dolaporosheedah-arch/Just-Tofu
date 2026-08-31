import { useCart } from "../../context/CartContext";

function SpiceDots({ level }) {
  return (
    <span className="spice-indicator">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`spice-dot${i <= level ? " active" : ""}`} />
      ))}
    </span>
  );
}

export default function DishModal({ dish, onClose }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(dish);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
      onClick={onClose}
    >
      <div
        className="dish-modal"
        id="dishModal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dish detail"
        >
          &times;
        </button>

        <div className="dish-modal-image-wrap">
          <img src={dish.image} alt={dish.name} className="dish-modal-image" />
          {dish.badge && <span className="dish-badge">{dish.badge}</span>}
        </div>

        <div className="dish-modal-body">
          <div className="dish-modal-header">
            <h2 className="dish-modal-name">{dish.name}</h2>
            <span className="dish-modal-price">${dish.price.toFixed(2)}</span>
          </div>

          <p className="dish-modal-desc">{dish.description}</p>

          <div className="dish-modal-meta">
            <div className="modal-meta-item">
              <span className="meta-label">Calories</span>
              <span className="meta-value">{dish.calories}</span>
            </div>
            {dish.spiceLevel > 0 && (
              <div className="modal-meta-item">
                <span className="meta-label">Spice</span>
                <SpiceDots level={dish.spiceLevel} />
              </div>
            )}
            <div className="modal-meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value">{dish.category}</span>
            </div>
          </div>

          <div className="dish-modal-dietary">
            {dish.dietary.map((d) => (
              <span key={d} className="dietary-tag">{d}</span>
            ))}
          </div>

          <div className="dish-modal-tags">
            {dish.tags.map((tag) => (
              <span key={tag} className="dish-tag">{tag}</span>
            ))}
          </div>

          <button
            className="btn btn-primary btn-block"
            id="modalAddToCartBtn"
            onClick={handleAdd}
          >
            <span>🛒</span>
            <span>Add to Cart — ${dish.price.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
