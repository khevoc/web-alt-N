import React from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./CartPage.css";

export default function CartPage() {
  const { cart, total, removeFromCart, clearCart } = useCart();
  const { t } = useTranslation();

  return (
    <section className="cart-section">
      <div className="cart-container">
        <h1 className="cart-title">{t("cart.title")}</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={64} className="empty-icon" />
            <p>{t("cart.empty")}</p>
            <Link to="/product" className="btn-return">
              {t("cart.browseCollection")}
            </Link>
          </div>
        ) : (
          <div className="cart-box">
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="cart-thumb-wrapper">
                    <img src={item.image} alt={item.name} className="cart-thumb" />
                  </div>
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p className="cart-price">${Number(item.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="btn-remove"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <h2>Total: <span>${Number(total).toFixed(2)}</span></h2>
              <div className="cart-actions">
                <button onClick={clearCart} className="btn-clear">
                  {t("cart.clearCart")}
                </button>
                <Link to="/checkout" className="btn-checkout">
                  {t("cart.proceedToCheckout")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
