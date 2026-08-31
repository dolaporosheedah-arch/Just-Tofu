import { useState } from "react";

const ORDER_TYPES = ["Dine-In", "Takeaway", "Delivery"];

function generateOrderCode() {
  return "#ORD-" + Math.floor(10000 + Math.random() * 90000);
}

export default function CheckoutModal({ cartItems, total, onClose, onComplete }) {
  const [orderType, setOrderType] = useState("Dine-In");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setConfirmed(generateOrderCode());
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      onClick={onClose}
    >
      <div
        className="checkout-modal"
        id="checkoutModal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {confirmed ? (
          <div className="checkout-success">
            <div className="confirmation-icon">🎉</div>
            <h2>Order Placed!</h2>
            <p className="confirmation-code">Order: <strong>{confirmed}</strong></p>
            <p>Thank you, <strong>{name}</strong>! Your {orderType.toLowerCase()} order is being prepared.</p>
            <p className="confirmation-note">
              Total charged: <strong>${total.toFixed(2)}</strong>
            </p>
            <button className="btn btn-primary" onClick={onComplete}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="checkout-title">Complete Your Order</h2>

            {/* Order Type */}
            <div className="order-type-tabs">
              {ORDER_TYPES.map((type) => (
                <button
                  key={type}
                  className={`order-type-btn${orderType === type ? " active" : ""}`}
                  onClick={() => setOrderType(type)}
                  type="button"
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <span>{item.name} ×{item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="checkout-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleConfirm}>
              <div className="form-group">
                <label htmlFor="checkout-name">Your Name *</label>
                <input
                  id="checkout-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>

              {orderType === "Delivery" && (
                <div className="form-group">
                  <label htmlFor="checkout-address">Delivery Address</label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="checkout-note">Order Note (Optional)</label>
                <textarea
                  id="checkout-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special instructions?"
                  rows={2}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" id="placeOrderBtn">
                Place Order — ${total.toFixed(2)}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
