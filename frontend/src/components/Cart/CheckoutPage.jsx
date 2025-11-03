import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import MaintenanceModal from "../../components/MaintenanceModal.jsx";
import { useTranslation } from "react-i18next";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { t } = useTranslation();

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <h1 className="checkout-title">{t("checkout.title")}</h1>

        <div className="checkout-content">
          {/* FORMULARIO */}
          <div className="checkout-form">
            <h2>{t("checkout.customerInformation")}</h2>
            <form>
              <label>
                {t("checkout.fullName")}
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
                {t("checkout.email")}
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
                {t("checkout.shippingAddress")}
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
            <h2>{t("checkout.orderSummary")}</h2>
            <div className="summary-top">
              <p className="summary-total">
                <strong>{t("checkout.total")}:</strong> ${Number(total).toFixed(2)}
              </p>
              <button
                className="btn-toggle"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? t("checkout.hideDetails") : t("checkout.viewDetails")}
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
              {t("checkout.payNow")}
            </button>
          </div>
        </div>
      </div>

      {showModal && <MaintenanceModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
