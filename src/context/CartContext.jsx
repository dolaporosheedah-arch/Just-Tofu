import { createContext, useContext, useReducer, useEffect, useState } from "react";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.item.id);
      const addQty = action.qty || 1;
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id
            ? {
                ...i,
                qty: i.qty + addQty,
                instructions: action.item.instructions || i.instructions,
              }
            : i
        );
      }
      return [...state, { ...action.item, qty: addQty }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QTY":
      if (action.qty < 1) return state.filter((i) => i.id !== action.id);
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: action.qty } : i
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem("justtofu_cart_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("justtofu_cart_v1", JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const addToCart = (item, qty = 1) => {
    dispatch({ type: "ADD_ITEM", item, qty });
    setBadgePulse(true);
    setTimeout(() => setBadgePulse(false), 500);
    showToast(`Added ${qty > 1 ? `${qty}× ` : ""}"${item.name}" to your order 🥢`);
  };

  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", id });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = 3.5;
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        tax,
        deliveryFee,
        total,
        badgePulse,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        showToast,
      }}
    >
      {children}

      {/* Floating Toast Notification Container */}
      <div className="toast-container" id="toastContainer" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-message visible">
            <span>✨</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
