import { useState } from "react";

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "2",
    date: "",
    time: "5:30 PM",
    seating: "Main Dining Room",
    special_request: "",
  });

  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      alert("Please fill in your name, email and reservation date.");
      return;
    }
    const code = "#TBL-" + Math.floor(10000 + Math.random() * 90000);
    setConfirmation({
      ...formData,
      code,
    });
  };

  return (
    <section className="reservations-section" id="reservations">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Table Booking</span>
          <h2 className="section-title">Reserve Your Table</h2>
          <p className="section-subtitle">
            Join us for a cozy lunch, dinner gathering, or a relaxing weekend brunch. We look forward to welcoming you.
          </p>
        </div>

        <div className="reservation-card-wrapper">
          <form id="reservationForm" onSubmit={handleSubmit} noValidate>
            <div className="reservation-form-grid">
              <div className="form-group">
                <label htmlFor="resName" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="resName"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Sarah Jenkins"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="resPhone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="resPhone"
                  name="phone"
                  className="form-input"
                  placeholder="e.g. +1 (555) 349-2810"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="resEmail" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="resEmail"
                  name="email"
                  className="form-input"
                  placeholder="e.g. sarah@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="resGuests" className="form-label">Number of Guests *</label>
                <select
                  id="resGuests"
                  name="guests"
                  className="form-select"
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option value="1">1 Guest (Solo Dining)</option>
                  <option value="2">2 Guests (Cozy Pair)</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests (Family / Friends)</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7+">7+ Guests (Large Party)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="resDate" className="form-label">Date *</label>
                <input
                  type="date"
                  id="resDate"
                  name="date"
                  className="form-input"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="resTime" className="form-label">Preferred Time *</label>
                <select
                  id="resTime"
                  name="time"
                  className="form-select"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="11:30 AM">11:30 AM (Lunch)</option>
                  <option value="12:00 PM">12:00 PM (Lunch)</option>
                  <option value="12:30 PM">12:30 PM (Lunch)</option>
                  <option value="1:00 PM">1:00 PM (Lunch)</option>
                  <option value="1:30 PM">1:30 PM (Lunch)</option>
                  <option value="5:30 PM">5:30 PM (Dinner)</option>
                  <option value="6:00 PM">6:00 PM (Dinner)</option>
                  <option value="6:30 PM">6:30 PM (Dinner)</option>
                  <option value="7:00 PM">7:00 PM (Dinner)</option>
                  <option value="7:30 PM">7:30 PM (Dinner)</option>
                  <option value="8:00 PM">8:00 PM (Dinner)</option>
                  <option value="8:30 PM">8:30 PM (Late Dinner)</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="resSeating" className="form-label">Seating Preference</label>
                <select
                  id="resSeating"
                  name="seating"
                  className="form-select"
                  value={formData.seating}
                  onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                >
                  <option value="Main Dining Room">Main Dining Room (Warm &amp; Lively)</option>
                  <option value="Window Nook">Window Nook (Cozy Sunlit)</option>
                  <option value="Low Table Banquette">Cozy Low Table Banquette</option>
                  <option value="Outdoor Terrace">Outdoor Garden Terrace</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="resNotes" className="form-label">Special Requests / Dietary Notes</label>
                <textarea
                  id="resNotes"
                  name="special_request"
                  className="form-textarea"
                  placeholder="Celebrating an occasion? Dietary allergies? Let us know here..."
                  value={formData.special_request}
                  onChange={(e) => setFormData({ ...formData, special_request: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="reservation-submit-wrap">
              <button type="submit" className="btn btn-book-table" id="bookTableSubmitBtn">
                BOOK A TABLE
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmation && (
        <div className="modal-wrapper active" id="reservationModal">
          <div className="modal-backdrop" onClick={() => setConfirmation(null)}></div>
          <div className="modal-card receipt-modal-card">
            <div className="success-check-icon" style={{ background: "#FEF3C7", color: "#D97706" }}>
              📅
            </div>
            <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)" }}>Table Reserved!</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              We have reserved your table. A confirmation SMS/Email has been dispatched.
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
                Reservation Code: <span>{confirmation.code}</span>
              </div>
              <div className="receipt-row">
                <span>Guest Name:</span>
                <strong>{confirmation.name}</strong>
              </div>
              <div className="receipt-row">
                <span>Date &amp; Time:</span>
                <strong>{confirmation.date} at {confirmation.time}</strong>
              </div>
              <div className="receipt-row">
                <span>Party Size:</span>
                <strong>{confirmation.guests} Guests</strong>
              </div>
              <div className="receipt-row">
                <span>Seating:</span>
                <strong>{confirmation.seating}</strong>
              </div>
              {confirmation.special_request && (
                <div
                  className="receipt-row"
                  style={{
                    marginTop: "0.4rem",
                    paddingTop: "0.4rem",
                    borderTop: "1px dashed var(--border-color)",
                  }}
                >
                  <span>Requests:</span>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                    {confirmation.special_request}
                  </span>
                </div>
              )}
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setConfirmation(null)}
              style={{ width: "100%" }}
            >
              Great, See You Soon!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
