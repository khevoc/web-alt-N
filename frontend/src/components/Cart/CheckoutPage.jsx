import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import IziPayModal from "../../widgets/IziPayModal.jsx";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (!form.name || !form.email || !form.address) {
      alert("Por favor completa todos los campos.");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    alert("✅ Pago exitoso. ¡Gracias por tu compra!");
    clearCart();
    setShowPayment(false);
  };

  return (
    <section className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>

      <div className="checkout-content">
        {/* 🛒 Resumen del carrito */}
        <div className="order-summary">
          <h3>Tu Pedido</h3>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          )}
          <h4>Total: ${total.toFixed(2)}</h4>
        </div>

        {/* 🧾 Formulario de datos */}
        <div className="checkout-form">
          <h3>Datos del comprador</h3>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Dirección de entrega"
            value={form.address}
            onChange={handleChange}
          ></textarea>
          <button className="btn-pay" onClick={handleCheckout}>
            Proceder al pago
          </button>
        </div>
      </div>

      {/* 💳 Modal de pago IziPay */}
      {showPayment && (
        <IziPayModal
          total={total}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </section>
  );
}
