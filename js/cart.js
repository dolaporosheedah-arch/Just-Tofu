// JUST TOFU - Cart & Online Ordering Engine

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.orderType = "takeaway"; // 'dinein', 'takeaway', 'delivery'
    this.deliveryFee = 3.50;
    this.taxRate = 0.08;
    this.initElements();
    this.bindEvents();
    this.render();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem("just_tofu_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem("just_tofu_cart", JSON.stringify(this.items));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
  }

  initElements() {
    this.cartDrawer = document.getElementById("cartDrawer");
    this.cartOverlay = document.getElementById("cartOverlay");
    this.cartItemsList = document.getElementById("cartItemsList");
    this.cartCountBadges = document.querySelectorAll(".cart-count-badge");
    this.cartSubtotalEl = document.getElementById("cartSubtotal");
    this.cartTaxEl = document.getElementById("cartTax");
    this.cartDeliveryEl = document.getElementById("cartDelivery");
    this.cartDeliveryRow = document.getElementById("cartDeliveryRow");
    this.cartTotalEl = document.getElementById("cartTotal");
    this.emptyCartState = document.getElementById("emptyCartState");
    this.cartSummaryState = document.getElementById("cartSummaryState");
    this.checkoutModal = document.getElementById("checkoutModal");
    this.orderSuccessModal = document.getElementById("orderSuccessModal");
  }

  bindEvents() {
    // Open Cart buttons
    document.querySelectorAll("[data-action='open-cart']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close Cart buttons
    document.querySelectorAll("[data-action='close-cart']").forEach(btn => {
      btn.addEventListener("click", () => this.closeDrawer());
    });

    if (this.cartOverlay) {
      this.cartOverlay.addEventListener("click", () => this.closeDrawer());
    }

    // Checkout button
    const checkoutBtn = document.getElementById("proceedToCheckoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (this.items.length === 0) {
          this.showToast("Your cart is empty. Add some delicious tofu first!");
          return;
        }
        this.closeDrawer();
        this.openCheckoutModal();
      });
    }

    // Checkout form submission
    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.processOrder(new FormData(checkoutForm));
      });
    }

    // Order type tabs in checkout
    document.querySelectorAll(".order-type-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        document.querySelectorAll(".order-type-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.orderType = tab.dataset.type;
        const addressGroup = document.getElementById("deliveryAddressGroup");
        const tableNumberGroup = document.getElementById("tableNumberGroup");
        
        if (addressGroup) {
          addressGroup.style.display = this.orderType === "delivery" ? "block" : "none";
          const addrInput = addressGroup.querySelector("input");
          if (addrInput) addrInput.required = this.orderType === "delivery";
        }
        if (tableNumberGroup) {
          tableNumberGroup.style.display = this.orderType === "dinein" ? "block" : "none";
        }
        this.renderTotals();
      });
    });
  }

  addItem(dishId, qty = 1, instructions = "") {
    const dish = MENU_DATA.find(d => d.id === dishId);
    if (!dish) return;

    const existing = this.items.find(i => i.id === dishId);
    if (existing) {
      existing.qty += qty;
      if (instructions) existing.instructions = instructions;
    } else {
      this.items.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        category: dish.category,
        qty: qty,
        instructions: instructions
      });
    }

    this.saveCart();
    this.render();
    this.showToast(`Added "${dish.name}" to your order! 🥢`);
    this.pulseBadge();
  }

  updateQty(dishId, change) {
    const item = this.items.find(i => i.id === dishId);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
      this.removeItem(dishId);
      return;
    }

    this.saveCart();
    this.render();
  }

  removeItem(dishId) {
    const item = this.items.find(i => i.id === dishId);
    const itemName = item ? item.name : "Item";
    this.items = this.items.filter(i => i.id !== dishId);
    this.saveCart();
    this.render();
    this.showToast(`Removed "${itemName}" from order`);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.render();
  }

  getTotalCount() {
    return this.items.reduce((acc, item) => acc + item.qty, 0);
  }

  getSubtotal() {
    return this.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }

  getCalculations() {
    const subtotal = this.getSubtotal();
    const tax = subtotal * this.taxRate;
    const delivery = (this.orderType === "delivery" && subtotal > 0) ? this.deliveryFee : 0;
    const total = subtotal + tax + delivery;
    return { subtotal, tax, delivery, total };
  }

  openDrawer() {
    if (this.cartDrawer) this.cartDrawer.classList.add("open");
    if (this.cartOverlay) this.cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeDrawer() {
    if (this.cartDrawer) this.cartDrawer.classList.remove("open");
    if (this.cartOverlay) this.cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  openCheckoutModal() {
    if (!this.checkoutModal) return;
    this.renderCheckoutSummary();
    this.checkoutModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeCheckoutModal() {
    if (!this.checkoutModal) return;
    this.checkoutModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  processOrder(formData) {
    const calcs = this.getCalculations();
    const orderNumber = "JT-" + Math.floor(100000 + Math.random() * 900000);
    const customerName = formData.get("customerName") || "Valued Guest";
    const customerPhone = formData.get("customerPhone") || "";
    const customerEmail = formData.get("customerEmail") || "";
    const orderNotes = formData.get("orderNotes") || "";
    const paymentMethod = formData.get("paymentMethod") || "Card";
    
    // Store last order for receipt display
    const orderDetails = {
      orderNumber,
      date: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" }),
      customerName,
      customerPhone,
      customerEmail,
      orderType: this.orderType.toUpperCase(),
      items: [...this.items],
      calcs,
      orderNotes,
      paymentMethod
    };

    // Close checkout modal
    this.closeCheckoutModal();

    // Show order success modal
    this.showOrderSuccess(orderDetails);

    // Reset cart
    this.clearCart();
  }

  showOrderSuccess(order) {
    if (!this.orderSuccessModal) return;

    const receiptOrderNumber = document.getElementById("receiptOrderNumber");
    const receiptDetails = document.getElementById("receiptDetails");
    const receiptItems = document.getElementById("receiptItems");
    const receiptTotal = document.getElementById("receiptTotal");

    if (receiptOrderNumber) receiptOrderNumber.textContent = `#${order.orderNumber}`;
    if (receiptDetails) {
      receiptDetails.innerHTML = `
        <div class="receipt-row"><span>Type:</span><strong>${order.orderType}</strong></div>
        <div class="receipt-row"><span>Customer:</span><strong>${order.customerName}</strong></div>
        <div class="receipt-row"><span>Estimated Prep Time:</span><strong class="highlight-green">15 - 20 mins</strong></div>
        <div class="receipt-row"><span>Payment:</span><strong>${order.paymentMethod} (Simulated)</strong></div>
      `;
    }

    if (receiptItems) {
      receiptItems.innerHTML = order.items.map(item => `
        <div class="receipt-item">
          <span>${item.qty}x ${item.name}</span>
          <span>$${(item.price * item.qty).toFixed(2)}</span>
        </div>
      `).join("");
    }

    if (receiptTotal) {
      receiptTotal.innerHTML = `
        <div class="receipt-row"><span>Subtotal</span><span>$${order.calcs.subtotal.toFixed(2)}</span></div>
        <div class="receipt-row"><span>Estimated Tax (8%)</span><span>$${order.calcs.tax.toFixed(2)}</span></div>
        ${order.calcs.delivery > 0 ? `<div class="receipt-row"><span>Delivery Fee</span><span>$${order.calcs.delivery.toFixed(2)}</span></div>` : ''}
        <div class="receipt-row receipt-grand-total"><span>Total</span><span>$${order.calcs.total.toFixed(2)}</span></div>
      `;
    }

    this.orderSuccessModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  pulseBadge() {
    this.cartCountBadges.forEach(badge => {
      badge.classList.remove("pulse-anim");
      void badge.offsetWidth; // trigger reflow
      badge.classList.add("pulse-anim");
    });
  }

  showToast(message) {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `
      <div class="toast-icon">✨</div>
      <div class="toast-text">${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("visible");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  renderTotals() {
    const { subtotal, tax, delivery, total } = this.getCalculations();

    if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (this.cartTaxEl) this.cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    if (this.cartDeliveryEl) this.cartDeliveryEl.textContent = `$${delivery.toFixed(2)}`;
    if (this.cartDeliveryRow) {
      this.cartDeliveryRow.style.display = this.orderType === "delivery" ? "flex" : "none";
    }
    if (this.cartTotalEl) this.cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  renderCheckoutSummary() {
    const container = document.getElementById("checkoutSummaryList");
    const totalsContainer = document.getElementById("checkoutSummaryTotals");
    const { subtotal, tax, delivery, total } = this.getCalculations();

    if (container) {
      container.innerHTML = this.items.map(item => `
        <div class="checkout-summary-item">
          <div class="summary-item-info">
            <span class="summary-qty">${item.qty}x</span>
            <span class="summary-name">${item.name}</span>
          </div>
          <span class="summary-price">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
      `).join("");
    }

    if (totalsContainer) {
      totalsContainer.innerHTML = `
        <div class="summary-row"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span>Estimated Tax:</span><span>$${tax.toFixed(2)}</span></div>
        ${this.orderType === "delivery" ? `<div class="summary-row"><span>Delivery Fee:</span><span>$${delivery.toFixed(2)}</span></div>` : ''}
        <div class="summary-row summary-grand-total"><span>Total Due:</span><span>$${total.toFixed(2)}</span></div>
      `;
    }
  }

  render() {
    const count = this.getTotalCount();

    // Update count badges
    this.cartCountBadges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? "inline-flex" : "none";
    });

    // Empty vs Filled view
    if (count === 0) {
      if (this.emptyCartState) this.emptyCartState.style.display = "flex";
      if (this.cartSummaryState) this.cartSummaryState.style.display = "none";
      if (this.cartItemsList) this.cartItemsList.innerHTML = "";
    } else {
      if (this.emptyCartState) this.emptyCartState.style.display = "none";
      if (this.cartSummaryState) this.cartSummaryState.style.display = "block";

      if (this.cartItemsList) {
        this.cartItemsList.innerHTML = this.items.map(item => `
          <div class="cart-item-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='images/tofu_pepper_soup.jpg'">
            <div class="cart-item-details">
              <div class="cart-item-top">
                <h4 class="cart-item-title">${item.name}</h4>
                <button class="cart-item-remove" data-action="remove-item" data-id="${item.id}" title="Remove item">&times;</button>
              </div>
              <span class="cart-item-unit-price">$${item.price.toFixed(2)}</span>
              <div class="cart-item-bottom">
                <div class="qty-stepper">
                  <button class="qty-btn" data-action="decrease-qty" data-id="${item.id}">−</button>
                  <span class="qty-val">${item.qty}</span>
                  <button class="qty-btn" data-action="increase-qty" data-id="${item.id}">+</button>
                </div>
                <span class="cart-item-subtotal">$${(item.price * item.qty).toFixed(2)}</span>
              </div>
            </div>
          </div>
        `).join("");

        // Attach listeners for dynamic items
        this.cartItemsList.querySelectorAll("[data-action='increase-qty']").forEach(btn => {
          btn.addEventListener("click", () => this.updateQty(btn.dataset.id, 1));
        });
        this.cartItemsList.querySelectorAll("[data-action='decrease-qty']").forEach(btn => {
          btn.addEventListener("click", () => this.updateQty(btn.dataset.id, -1));
        });
        this.cartItemsList.querySelectorAll("[data-action='remove-item']").forEach(btn => {
          btn.addEventListener("click", () => this.removeItem(btn.dataset.id));
        });
      }
    }

    this.renderTotals();
  }
}

// Global instance
window.cart = null;
document.addEventListener("DOMContentLoaded", () => {
  window.cart = new CartManager();
});
