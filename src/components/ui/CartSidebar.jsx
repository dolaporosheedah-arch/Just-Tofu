import { useCart } from "../../context/CartContext";
import CheckoutModal from "./CheckoutModal";
import { useState } from "react";

export default function CartSidebar({ open, onClose }) {
  const {
    cartItems,
    subtotal,
    tax,
    total,
    removeFromCart,
    updateQty,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      {/* Cart Drawer Panel */}
      <aside
        className={`cart-drawer${open ? " open" : ""}`}
        id="cartDrawer"
        aria-label="Your Food Order Cart"
        {...(!open ? { inert: "" } : {})}
      >
        <div className="cart-header">
          <h3 className="cart-title">
            <span>🛒</span> Your Order
          </h3>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state" id="emptyCartState">
              <div className="empty-cart-icon">🥢</div>
              <h4 className="empty-cart-text">Your order is empty</h4>
              <p className="empty-cart-sub">
                Explore our menu and add your favorite fresh tofu dishes to get started.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  onClose();
                  const menuEl = document.getElementById("menu");
                  if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-list" id="cartItemsList">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <h5 className="cart-item-title">{item.name}</h5>
                        <span className="cart-item-unit-price">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                        aria-label={`Remove ${item.name}`}
                      >
                        &times;
                      </button>
                    </div>

                    {item.instructions && (
                      <div style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--color-accent)", margin: "0.2rem 0" }}>
                        “{item.instructions}”
                      </div>
                    )}

                    <div className="cart-item-bottom">
                      <div className="qty-stepper">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty-val">{item.qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-subtotal">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer" id="cartSummaryState">
            <div className="cart-totals-breakdown">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="totals-row">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="totals-row grand-total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-checkout"
              id="proceedToCheckoutBtn"
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout &rarr;
            </button>
          </div>
        )}
      </aside>

      {/* Backdrop overlay */}
      <div
        className={`overlay-backdrop${open ? " active" : ""}`}
        id="cartOverlay"
        onClick={onClose}
        style={{ zIndex: 1090 }}
      ></div>

      {checkoutOpen && (
        <CheckoutModal
          cartItems={cartItems}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onComplete={() => {
            setCheckoutOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
