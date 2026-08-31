// JUST TOFU - Table Reservations Engine

document.addEventListener("DOMContentLoaded", () => {
  const reservationForm = document.getElementById("reservationForm");
  const reservationModal = document.getElementById("reservationModal");
  const reservationDateInput = document.getElementById("resDate");

  // Set default and min date to today
  if (reservationDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    reservationDateInput.min = `${yyyy}-${mm}-${dd}`;
    
    // Default to today if not selected
    if (!reservationDateInput.value) {
      reservationDateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  // Handle Form Submission
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(reservationForm);
      const name = formData.get("name")?.trim();
      const phone = formData.get("phone")?.trim();
      const email = formData.get("email")?.trim();
      const date = formData.get("date");
      const time = formData.get("time");
      const guests = formData.get("guests");
      const seating = formData.get("seating") || "Standard Indoor";
      const requests = formData.get("special_request")?.trim() || "None specified";

      if (!name || !phone || !email || !date || !time || !guests) {
        if (window.cart) {
          window.cart.showToast("Please fill in all required fields to complete your reservation.");
        } else {
          alert("Please fill in all required fields.");
        }
        return;
      }

      // Generate Reservation Code
      const resCode = "TBL-" + Math.floor(10000 + Math.random() * 90000);

      // Populate Confirmation Modal
      const modalCode = document.getElementById("resModalCode");
      const modalGuestName = document.getElementById("resModalGuestName");
      const modalDateTime = document.getElementById("resModalDateTime");
      const modalGuests = document.getElementById("resModalGuests");
      const modalSeating = document.getElementById("resModalSeating");
      const modalRequests = document.getElementById("resModalRequests");

      if (modalCode) modalCode.textContent = resCode;
      if (modalGuestName) modalGuestName.textContent = name;
      if (modalDateTime) {
        const formattedDate = new Date(date + "T00:00:00").toLocaleDateString('en-US', {
          weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
        });
        modalDateTime.textContent = `${formattedDate} at ${time}`;
      }
      if (modalGuests) modalGuests.textContent = `${guests} Guest${Number(guests) > 1 ? 's' : ''}`;
      if (modalSeating) modalSeating.textContent = seating;
      if (modalRequests) modalRequests.textContent = requests;

      // Show Reservation Modal
      if (reservationModal) {
        reservationModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }

      // Show Toast Confirmation
      if (window.cart) {
        window.cart.showToast(`Table booked successfully for ${name}! 🎉`);
      }

      // Reset form
      reservationForm.reset();
      if (reservationDateInput) {
        const today = new Date();
        reservationDateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      }
    });
  }

  // Close reservation modal
  document.querySelectorAll("[data-action='close-reservation-modal']").forEach(btn => {
    btn.addEventListener("click", () => {
      if (reservationModal) {
        reservationModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
});
