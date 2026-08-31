import { useState } from "react";
import { CartProvider } from "./context/CartContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Sections
import Hero from "./components/Hero";
import FeaturedDishes from "./components/FeaturedDishes";
import Menu from "./components/Menu";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Contact from "./components/Contact";

// UI
import CartSidebar from "./components/ui/CartSidebar";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      {/* Sticky Navigation */}
      <Navbar onOpenCart={() => setCartOpen(true)} />

      {/* Page Sections */}
      <main>
        <Hero />
        <FeaturedDishes />
        <Menu />
        <About />
        <Gallery />
        <Reservations />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar (slides in from right) */}
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </CartProvider>
  );
}
