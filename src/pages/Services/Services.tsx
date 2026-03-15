import './services.css';

const services = [
  {
    icon: '🎨',
    title: 'Internal Painting',
    description: 'Premium wall, ceiling, and interior finish systems for homes, towers, and commercial spaces.',
  },
  {
    icon: '🖌️',
    title: 'External Painting',
    description: 'Weather-resistant façade painting with high-durability coatings for long-term performance.',
  },
  {
    icon: '🧱',
    title: 'Gypsum Work',
    description: 'False ceilings, partitions, and gypsum finishing solutions with clean detailing.',
  },
  {
    icon: '🛠️',
    title: 'Structural Repairing',
    description: 'Repair and restoration works to strengthen and protect aging or damaged structures.',
  },
  {
    icon: '💧',
    title: 'Water Proofing',
    description: 'End-to-end waterproofing systems for terraces, basements, wet areas, and façades.',
  },
  {
    icon: '👷',
    title: 'Civil Works',
    description: 'Execution support for masonry, patchwork, and civil finishing aligned with project timelines.',
  },
  {
    icon: '🧰',
    title: 'Floor Coatings',
    description: 'Protective and decorative floor coating applications for industrial and commercial use.',
  },
];

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
            {services.map((service) => (
              <li key={service.title} className="service-item">
                <div className="service-icon" aria-hidden>{service.icon}</div>
                <div className="service-label">{service.title}</div>
                <p className="service-description">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
