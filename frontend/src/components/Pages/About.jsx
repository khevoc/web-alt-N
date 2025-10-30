import React from "react";
import "./pages.css";
import { useTranslation, Trans } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <section className="page-container contact-page-container">
        {/* Fondo animado de puntos digitales */}
        <div className="digital-grid"></div>

      <div className="about-hero">
        {/* Contenido principal del hero */}
        <div className="about-hero-content">
          <h1 className="page-title">{t("about.title")}</h1>
          <p className="page-subtitle">{t("about.tagline")}</p>
        </div>
      </div>

      <div className="about-main">
        <div className="about-intro">
          <p className="page-text">
            <Trans i18nKey="about.intro">
              At <span className="highlight">Neo Altair</span>, we blend
              <strong> technology, innovation, and vision </strong> to redefine
              the digital investment experience. We are a platform that unites
              the world of <em>blockchain</em> with modern design and
              next-generation security.
            </Trans>
          </p>

          <p className="page-text">
            <Trans i18nKey="about.mission">
              Our mission is to build an ecosystem where
              <strong> digital assets </strong> and
              <strong> luxury-grade tokens </strong> merge seamlessly into
              everyday life. Every detail of Neo Altair is crafted to deliver
              <span className="highlight">
                {" "}
                transparency, control, and elegance{" "}
              </span>
              to our users.
            </Trans>
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="icon">🔐</div>
            <h3>{t("about.securityTitle")}</h3>
            <p>{t("about.securityText")}</p>
          </div>

          <div className="about-card">
            <div className="icon">💡</div>
            <h3>{t("about.innovationTitle")}</h3>
            <p>{t("about.innovationText")}</p>
          </div>

          <div className="about-card">
            <div className="icon">🌐</div>
            <h3>{t("about.connectivityTitle")}</h3>
            <p>{t("about.connectivityText")}</p>
          </div>
        </div>

        <div className="about-footer">
          <h4>{t("about.footer")}</h4>
        </div>
      </div>
    </section>
  );
}
