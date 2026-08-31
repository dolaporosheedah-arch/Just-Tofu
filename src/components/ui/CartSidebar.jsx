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
    clearCart,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`overlay-backdrop${open ? " active" : ""}`}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <aside
        className={`cart-sidebar${open ? " open" : ""}`}
        id="cartSidebar"
        aria-label="Shopping Cart"
        aria-hidden={!open}
      >
        {/* Cart Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            Your Order <span className="cart-count-badge">{cartCount}</span>
          </h2>
          <button
            className="cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items" id="cartItems">
          {cartItems.length === 0 ? (
            <div className="cart-empty" id="cartEmpty">
              <span>🛒</span>
              <p>Your cart is empty</p>
              <p className="cart-empty-sub">Add some delicious tofu dishes!</p>
              <button className="btn btn-primary" onClick={onClose}>
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-body">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <span className="cart-item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer" id="cartFooter">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-total-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="cart-total-row">
                <span>Delivery</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="cart-total-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              id="checkoutBtn"
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout
            </button>
            <button
              className="btn btn-ghost btn-block"
              onClick={() => { clearCart(); }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>

      {checkoutOpen && (
        <CheckoutModal
          cartItems={cartItems}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onComplete={() => {
            clearCart();
            setCheckoutOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
