export default function MobileDrawer({
  open,
  onClose,
  navLinks,
  onNavigate,
  onOpenCart,
  cartCount,
}) {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`overlay-backdrop${open ? " active" : ""}`}
        id="mobileMenuOverlay"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`mobile-drawer${open ? " open" : ""}`}
        id="mobileMenuDrawer"
        aria-label="Mobile Navigation"
        {...(!open ? { inert: "" } : {})}
      >
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <a
            href="#home"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
          >
            <img src="/images/logo.png" alt="JUST TOFU Logo" className="brand-logo-img" />
            <div className="brand-logo-text">
              <span className="brand-name">JUST TOFU</span>
              <span className="brand-tagline-sub">FRESH &bull; DELICIOUS &bull; NOURISHING</span>
            </div>
          </a>
          <button
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mobile-nav-list">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.href);
              }}
            >
              <span>{link.label}</span>
              <span>&rarr;</span>
            </a>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="mobile-drawer-footer">
          <button
            className="btn btn-accent"
            onClick={onOpenCart}
            style={{ width: "100%" }}
            id="mobileDrawerCartBtn"
          >
            <span>🛒 View Cart</span>
            {cartCount > 0 && (
              <span
                className="cart-count-badge"
                style={{ position: "static", border: "none", marginLeft: "8px" }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="#menu"
            className="btn btn-primary mobile-nav-link"
            style={{ justifyContent: "center" }}
            id="mobileDrawerOrderBtn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("menu");
            }}
          >
            ORDER NOW
          </a>
        </div>
      </div>
    </>
  );
}
