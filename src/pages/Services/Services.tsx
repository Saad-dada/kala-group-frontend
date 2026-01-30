import './services.css';

export default function Services() {
  return (
    <main className="site-main services-page">
      <section className="default-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Our Services</div>
          <h1 className="services-headline">
            What We Offer and How We Deliver Impact
          </h1>
          <p className="services-lede">
            From concept to completion, we provide comprehensive building services
            tailored to residential, commercial, and industrial projects across India.
          </p>
        </div>
      </section>

      <section className="services-content site-section">
        <div className="services-container services-grid-wrap">
          <div className="services-surface" aria-hidden />

          <ul className="services-grid">
            <li className="service-item">
              <div className="service-icon" aria-hidden>🎨</div>
              <div className="service-label">Internal Painting</div>
            </li>

            <li className="service-item">
              <div className="service-icon" aria-hidden>🖌️</div>
              <div className="service-label">External Painting</div>
            </li>

            <li className="service-item">
              <div className="service-icon" aria-hidden>🧱</div>
              <div className="service-label">Gypsum Work</div>
            </li>

            <li className="service-item wide">
              <div className="service-icon" aria-hidden>🛠️</div>
              <div className="service-label">Structural Repairing</div>
            </li>

            <li className="service-item">
              <div className="service-icon" aria-hidden>💧</div>
              <div className="service-label">Water Proofing</div>
            </li>

            <li className="service-item">
              <div className="service-icon" aria-hidden>👷</div>
              <div className="service-label">Civil Works</div>
            </li>

            <li className="service-item">
              <div className="service-icon" aria-hidden>🧰</div>
              <div className="service-label">Floor Coatings</div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
