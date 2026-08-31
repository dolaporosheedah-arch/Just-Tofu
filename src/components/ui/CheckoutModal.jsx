import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CheckoutModal({ cartItems, subtotal, tax, total, onClose, onComplete }) {
  const { clearCart } = useCart();
  const [orderType, setOrderType] = useState("takeaway");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    tableNumber: "",
    paymentMethod: "Credit / Debit Card",
    notes: "",
  });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill in your name, phone and email.");
      return;
    }

    const orderNum = "#JT-" + Math.floor(100000 + Math.random() * 900000);
    setReceipt({
      orderNum,
      ...formData,
      orderType,
      items: [...cartItems],
      subtotal,
      tax,
      total,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    clearCart();
  };

  return (
    <>
      {!receipt ? (
        <div className="modal-wrapper active" id="checkoutModal">
          <div className="modal-backdrop" onClick={onClose}></div>
          <div className="modal-card checkout-modal-card">
            <button className="modal-close-btn" onClick={onClose}>
              &times;
            </button>

            <div className="checkout-header">
              <span className="section-tag">Online Checkout</span>
              <h3 style={{ fontSize: "1.65rem", marginTop: "0.4rem" }}>
                Complete Your Order
              </h3>
            </div>

            {/* Order Type Selector */}
            <div className="order-type-tabs">
              <button
                type="button"
                className={`order-type-tab${orderType === "takeaway" ? " active" : ""}`}
                onClick={() => setOrderType("takeaway")}
              >
                🛍️ Takeaway
              </button>
              <button
                type="button"
                className={`order-type-tab${orderType === "dinein" ? " active" : ""}`}
                onClick={() => setOrderType("dinein")}
              >
                🍽️ Dine-In
              </button>
              <button
                type="button"
                className={`order-type-tab${orderType === "delivery" ? " active" : ""}`}
                onClick={() => setOrderType("delivery")}
              >
                🛵 Delivery
              </button>
            </div>

            {/* Order Summary Preview */}
            <div className="checkout-summary-box">
              <div className="checkout-summary-list">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.875rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span>
                      {item.name} &times; {item.qty}
                    </span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderTop: "1px dashed var(--border-color)",
                  marginTop: "0.5rem",
                  paddingTop: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                }}
              >
                <span>Total Due:</span>
                <span style={{ color: "var(--color-primary)" }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <form id="checkoutForm" onSubmit={handleSubmit}>
              <div
                className="reservation-form-grid"
                style={{ gap: "1rem", marginBottom: "1.25rem" }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="custName">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="custName"
                    className="form-input"
                    placeholder="e.g. Jane Doe"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="custPhone">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="custPhone"
                    className="form-input"
                    placeholder="e.g. (555) 123-4567"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="custEmail">
                    Email for Order Receipt *
                  </label>
                  <input
                    type="email"
                    id="custEmail"
                    className="form-input"
                    placeholder="e.g. jane@example.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {orderType === "delivery" && (
                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="custAddress">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      id="custAddress"
                      className="form-input"
                      placeholder="Street Address, Apt / Suite #"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                )}

                {orderType === "dinein" && (
                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="custTableNum">
                      Table Number (If seated)
                    </label>
                    <input
                      type="text"
                      id="custTableNum"
                      className="form-input"
                      placeholder="e.g. Table 04"
                      value={formData.tableNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, tableNumber: e.target.value })
                      }
                    />
                  </div>
                )}

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="payMethod">
                    Payment Simulation Method
                  </label>
                  <select
                    id="payMethod"
                    className="form-select"
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                  >
                    <option value="Credit / Debit Card">💳 Credit / Debit Card</option>
                    <option value="Apple Pay / Google Pay">
                      📱 Apple Pay / Google Pay
                    </option>
                    <option value="Pay upon Pick-Up">
                      💵 Pay upon Pick-Up / Dine-In
                    </option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="orderNotes">
                    Order Notes
                  </label>
                  <input
                    type="text"
                    id="orderNotes"
                    className="form-input"
                    placeholder="e.g. Utensils included, leave at door..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-accent"
                style={{ width: "100%", padding: "0.9rem" }}
              >
                Place Order &bull; Send to Kitchen 🥢
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="modal-wrapper active" id="orderSuccessModal">
          <div className="modal-backdrop" onClick={onComplete}></div>
          <div className="modal-card receipt-modal-card">
            <div className="success-check-icon">✓</div>
            <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)" }}>
              Order Confirmed!
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Thank you for dining with JUST TOFU. Your order is being freshly prepared.
            </p>

            <div className="receipt-ticket">
              <div
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  marginBottom: "0.75rem",
                  color: "var(--color-primary)",
                }}
              >
                JUST TOFU <span>{receipt.orderNum}</span>
              </div>
              <div
                style={{
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px dashed var(--border-color)",
                }}
              >
                <div className="receipt-row">
                  <span>Guest:</span>
                  <strong>{receipt.name}</strong>
                </div>
                <div className="receipt-row">
                  <span>Type:</span>
                  <strong style={{ textTransform: "capitalize" }}>
                    {receipt.orderType}
                  </strong>
                </div>
                <div className="receipt-row">
                  <span>Time:</span>
                  <strong>{receipt.time}</strong>
                </div>
              </div>

              <div
                style={{
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px dashed var(--border-color)",
                }}
              >
                {receipt.items.map((it) => (
                  <div
                    key={it.id}
                    className="receipt-row"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <span>
                      {it.name} &times; {it.qty}
                    </span>
                    <span>${(it.price * it.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-row" style={{ fontWeight: 700 }}>
                <span>Total Paid:</span>
                <span style={{ color: "var(--color-primary)" }}>
                  ${receipt.total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={onComplete}
              style={{ width: "100%" }}
            >
              Done &amp; Return to Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
}
