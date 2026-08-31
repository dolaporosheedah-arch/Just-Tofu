import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useScrollSpy } from "../hooks/useScrollSpy";
import MobileDrawer from "./MobileDrawer";

const NAV_LINKS = [
  { href: "home", label: "Home" },
  { href: "featured", label: "Our Tofu" },
  { href: "menu", label: "Menu" },
  { href: "about", label: "About" },
  { href: "gallery", label: "Gallery" },
  { href: "reservations", label: "Reservations" },
  { href: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href);

export default function Navbar({ onOpenCart }) {
  const { cartCount } = useCart();
  const activeId = useScrollSpy(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Add shadow + shrink effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="mainHeader">
        <div className="container header-container">
          {/* Logo */}
          <a
            href="#home"
            className="brand-logo"
            id="navLogo"
            aria-label="JUST TOFU Home"
            onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
          >
            <img src="/images/logo.png" alt="JUST TOFU Logo" className="brand-logo-img" />
            <div className="brand-logo-text">
              <span className="brand-name">JUST TOFU</span>
              <span className="brand-tagline-sub">FRESH &bull; DELICIOUS &bull; NOURISHING</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-desktop" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                className={`nav-link${activeId === link.href ? " active" : ""}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <button
              className="cart-trigger-btn"
              onClick={onOpenCart}
              aria-label="View Shopping Cart"
              id="headerCartBtn"
            >
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="cart-count-badge">{cartCount}</span>
              )}
            </button>

            <a
              href="#menu"
              className="btn btn-primary"
              id="headerOrderNowBtn"
              onClick={(e) => { e.preventDefault(); scrollToSection("menu"); }}
            >
              <span>ORDER NOW</span>
            </a>

            {/* Hamburger */}
            <button
              className="hamburger-btn"
              id="mobileMenuToggle"
              aria-label="Toggle navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={NAV_LINKS}
        onNavigate={scrollToSection}
        onOpenCart={() => { setDrawerOpen(false); onOpenCart(); }}
        cartCount={cartCount}
      />
    </>
  );
}
