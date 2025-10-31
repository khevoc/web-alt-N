import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import MaintenanceModal from "../../components/MaintenanceModal.jsx";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          {/* FORMULARIO */}
          <div className="checkout-form">
            <h2>Customer Information</h2>
            <form>
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@email.com"
                  required
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Ocean Drive"
                  required
                />
              </label>
            </form>
          </div>

          {/* RESUMEN */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-top">
              <p className="summary-total">
                <strong>Total:</strong> ${Number(total).toFixed(2)}
              </p>
              <button
                className="btn-toggle"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide Details" : "View Details"}
              </button>
            </div>

            {showDetails && (
              <ul className="summary-list">
                {cart.map((item, index) => (
                  <li key={index} className="summary-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="summary-thumb"
                    />
                    <div className="summary-info">
                      <p>{item.name}</p>
                      <p>${Number(item.price).toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button className="btn-pay" onClick={() => setShowModal(true)}>
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {showModal && <MaintenanceModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
