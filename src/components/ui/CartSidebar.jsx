import { useCart } from "../../context/CartContext";
import CheckoutModal from "./CheckoutModal";
import { useState } from "react";

export default function CartSidebar({ open, onClose }) {
  const {
    cartItems,
    cartCount,
    subtotal,
    tax,
    deliveryFee,
    total,
    removeFromCart,
    updateQty,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      {/* Cart Drawer Panel */}
      <div
        className={`cart-drawer${open ? " active" : ""}`}
        id="cartDrawer"
        aria-label="Your Food Order Cart"
      >
        <div className="cart-header">
          <h3 className="cart-title">
            <span>🛒</span> Your Order
          </h3>
          <button
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
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h5 className="cart-item-title">{item.name}</h5>
                    <div className="cart-item-price-unit">
                      ${item.price.toFixed(2)} each
                    </div>
                    {item.instructions && (
                      <div className="cart-item-notes">“{item.instructions}”</div>
                    )}
                    <div className="cart-item-bottom">
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >
                          −
                        </button>
                        <span className="qty-val">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-subtotal">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        🗑
                      </button>
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
              className="btn btn-checkout"
              id="proceedToCheckoutBtn"
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout &rarr;
            </button>
          </div>
        )}
      </div>

      <div
        className={`overlay-backdrop${open ? " active" : ""}`}
        id="cartOverlay"
        onClick={onClose}
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
