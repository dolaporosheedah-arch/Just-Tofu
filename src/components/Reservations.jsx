import { useState } from "react";

const PARTY_SIZES = ["1–2 Guests", "3–4 Guests", "5–6 Guests", "7+ Guests"];
const SEATING = ["Classic Table", "Cozy Low Table Banquette", "Counter Bar"];

function generateCode() {
  return "#TBL-" + Math.floor(10000 + Math.random() * 90000);
}

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

export default function Reservations() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    seating: "",
    requests: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email required.";
    if (!form.date) errs.date = "Please select a date.";
    if (!form.time) errs.time = "Please select a time.";
    if (!form.partySize) errs.partySize = "Please select party size.";
    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setConfirmation({
      code: generateCode(),
      ...form,
    });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", date: "", time: "", partySize: "", seating: "", requests: "" });
    setErrors({});
    setConfirmation(null);
  };

  return (
    <section className="section reservations-section" id="reservations">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Book a Table</span>
          <h2 className="section-title">Reservations</h2>
          <p className="section-subtitle">
            Reserve your spot and let us take care of the rest.
          </p>
        </div>

        <div className="reservations-layout">
          {/* Info Panel */}
          <div className="reservations-info">
            <div className="res-info-card">
              <h3>Opening Hours</h3>
              <ul className="hours-list">
                <li><span>Monday – Friday</span><span>11:30 AM – 10:00 PM</span></li>
                <li><span>Saturday</span><span>11:00 AM – 10:30 PM</span></li>
                <li><span>Sunday</span><span>11:00 AM – 9:00 PM</span></li>
              </ul>
            </div>
            <div className="res-info-card">
              <h3>Good to Know</h3>
              <ul className="res-notes">
                <li>🕐 Reservations held for 15 minutes</li>
                <li>🎂 Birthday arrangements available on request</li>
                <li>🌿 Full vegan menu available</li>
                <li>📞 Call us: (012) 345-6789</li>
              </ul>
            </div>
          </div>

          {/* Form or Confirmation */}
          <div className="reservations-form-wrap">
            {confirmation ? (
              <div className="reservation-confirmation">
                <div className="confirmation-icon">✅</div>
                <h3>Reservation Confirmed!</h3>
                <p className="confirmation-code">
                  Your booking code: <strong>{confirmation.code}</strong>
                </p>
                <p>
                  Thank you, <strong>{confirmation.name}</strong>! We&apos;ve reserved a table
                  for <strong>{confirmation.partySize}</strong> on{" "}
                  <strong>{confirmation.date}</strong> at{" "}
                  <strong>{confirmation.time}</strong>.
                </p>
                <p className="confirmation-note">
                  A confirmation will be sent to{" "}
                  <strong>{confirmation.email}</strong>. We look forward to
                  welcoming you!
                </p>
                <button className="btn btn-primary" onClick={resetForm}>
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form
                className="reservation-form"
                id="reservationForm"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-name">Full Name *</label>
                    <input
                      id="res-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-email">Email Address *</label>
                    <input
                      id="res-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-phone">Phone Number</label>
                    <input
                      id="res-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (000) 000-0000"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-partySize">Party Size *</label>
                    <select
                      id="res-partySize"
                      name="partySize"
                      value={form.partySize}
                      onChange={handleChange}
                      className={errors.partySize ? "error" : ""}
                    >
                      <option value="">Select party size</option>
                      {PARTY_SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.partySize && <span className="form-error">{errors.partySize}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-date">Date *</label>
                    <input
                      id="res-date"
                      name="date"
                      type="date"
                      min={getTodayString()}
                      value={form.date}
                      onChange={handleChange}
                      className={errors.date ? "error" : ""}
                    />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-time">Time *</label>
                    <input
                      id="res-time"
                      name="time"
                      type="time"
                      min="11:30"
                      max="21:30"
                      value={form.time}
                      onChange={handleChange}
                      className={errors.time ? "error" : ""}
                    />
                    {errors.time && <span className="form-error">{errors.time}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="res-seating">Seating Preference</label>
                  <select
                    id="res-seating"
                    name="seating"
                    value={form.seating}
                    onChange={handleChange}
                  >
                    <option value="">No preference</option>
                    {SEATING.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="res-requests">Special Requests</label>
                  <textarea
                    id="res-requests"
                    name="requests"
                    value={form.requests}
                    onChange={handleChange}
                    placeholder="Dietary requirements, celebrations, accessibility needs..."
                    rows={3}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block" id="submitReservationBtn">
                  <span>📅</span>
                  <span>Confirm Reservation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
