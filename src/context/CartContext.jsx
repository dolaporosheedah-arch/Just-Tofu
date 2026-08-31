import { createContext, useContext, useReducer, useEffect } from "react";

// ─── Cart Reducer ────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
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

// ─── Context ─────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem("justTofu_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("justTofu_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => dispatch({ type: "ADD_ITEM", item });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", id });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = cartItems.length > 0 ? 3.5 : 0;
  const total = subtotal + tax + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        tax,
        deliveryFee,
        total,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
