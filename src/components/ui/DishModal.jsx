import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function DishModal({ dish, onClose }) {
  const { addToCart } = useCart();
  const [modalQty, setModalQty] = useState(1);
  const [instructions, setInstructions] = useState("");

  const handleAdd = () => {
    addToCart({ ...dish, instructions }, modalQty);
    onClose();
  };

  return (
    <div className="modal-wrapper active" id="dishDetailModal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-card">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dish details"
        >
          &times;
        </button>
        <img
          src={dish.image}
          alt={dish.name}
          id="modalDishImg"
          className="dish-modal-img"
        />
        <div className="dish-modal-body">
          <div className="dish-modal-header">
            <h3 id="modalDishTitle" style={{ fontSize: "1.5rem" }}>
              {dish.name}
            </h3>
            <span id="modalDishPrice" className="dish-modal-price">
              ${dish.price.toFixed(2)}
            </span>
          </div>
          <p id="modalDishDesc" className="dish-modal-desc">
            {dish.description}
          </p>

          <div className="dish-modal-meta">
            <div id="modalDishDietary" className="dietary-pills">
              {dish.dietary.map((d) => (
                <span key={d} className="diet-pill">
                  {d}
                </span>
              ))}
            </div>
            <div id="modalDishSpice">
              {dish.spiceLevel > 0 ? (
                <span>
                  Spice Level: <strong>{"🌶️".repeat(dish.spiceLevel)}</strong>
                </span>
              ) : (
                <span>Mild &amp; Gentle</span>
              )}
            </div>
          </div>

          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-light)",
              marginBottom: "1.25rem",
            }}
            id="modalDishCalories"
          >
            {dish.calories || "Crafted with organic soybeans"}
          </div>

          <div className="form-group" style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="modalSpecialNotes" className="form-label">
              Special Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              id="modalSpecialNotes"
              className="form-input"
              placeholder="e.g. Extra scallions, less chili oil, allergy alert..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className="dish-modal-actions">
            <div className="qty-stepper" style={{ padding: "6px 12px" }}>
              <button
                className="qty-btn"
                onClick={() => setModalQty((q) => (q > 1 ? q - 1 : 1))}
              >
                −
              </button>
              <span
                className="qty-val"
                id="modalDishQty"
                style={{ fontSize: "1rem", minWidth: "24px" }}
              >
                {modalQty}
              </span>
              <button
                className="qty-btn"
                onClick={() => setModalQty((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-accent"
              id="modalAddToCartBtn"
              style={{ flex: 1 }}
              onClick={handleAdd}
            >
              Add to Order &bull; ${(dish.price * modalQty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
