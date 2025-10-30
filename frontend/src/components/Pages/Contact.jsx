import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
import "./pages.css";

export default function ContactPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("contact.validation.nameRequired");
    if (!formData.email.trim())
      newErrors.email = t("contact.validation.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("contact.validation.emailInvalid");
    if (!formData.message.trim())
      newErrors.message = t("contact.validation.messageRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    emailjs
      .send(
        "TU_SERVICE_ID", // <-- reemplaza con tu Service ID
        "TU_TEMPLATE_ID", // <-- reemplaza con tu Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "TU_PUBLIC_KEY" // <-- reemplaza con tu Public Key
      )
      .then(
        () => {
          setSent(true);
          setSending(false);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Error al enviar:", error);
          setSending(false);
          alert(t("contact.errorAlert"));
        }
      );
  };

  return (
    <section className="contact-page-container">
      {/* Fondo animado digital */}
      <div className="digital-grid" />

      <div className="contact-card">
        <h2 className="contact-title">{t("contact.title")}</h2>

        {sent ? (
          <p className="success-text">{t("contact.successMessage")}</p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <label>{t("contact.nameLabel")}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={t("contact.namePlaceholder")}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <label>{t("contact.emailLabel")}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder={t("contact.emailPlaceholder")}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label>{t("contact.messageLabel")}</label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder={t("contact.messagePlaceholder")}
            />
            {errors.message && <p className="error-text">{errors.message}</p>}

            <button type="submit" disabled={sending} className="send-button">
              {sending ? t("contact.sendingButton") : t("contact.sendButton")}
            </button>
          </form>
        )}

        {/* Bloque de contacto adicional */}
        <div className="contact-info">
          <p className="contact-subtitle">{t("contact.info.subtitle")}</p>
          <div className="info-item">
            <Mail size={20} className="info-icon" />
            <div>
              <p className="info-label">{t("contact.info.emailTitle")}</p>
              <p className="info-value">{t("contact.info.emailValue")}</p>
            </div>
          </div>
          <div className="info-item">
            <Phone size={20} className="info-icon" />
            <div>
              <p className="info-label">{t("contact.info.phoneTitle")}</p>
              <p className="info-value">{t("contact.info.phoneValue")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
