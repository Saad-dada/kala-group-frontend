import './services.css';
import {
  Building2,
  Droplets,
  Hammer,
  House,
  Layers,
  PaintRoller,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: ServiceItem[] = [
  {
    icon: House,
    title: 'Internal Painting',
    description: 'Premium wall, ceiling, and interior finish systems for homes, towers, and commercial spaces.',
  },
  {
    icon: Building2,
    title: 'External Painting',
    description: 'Weather-resistant façade painting with high-durability coatings for long-term performance.',
  },
  {
    icon: Layers,
    title: 'Gypsum Work',
    description: 'False ceilings, partitions, and gypsum finishing solutions with clean detailing.',
  },
  {
    icon: Wrench,
    title: 'Structural Repairing',
    description: 'Repair and restoration works to strengthen and protect aging or damaged structures.',
  },
  {
    icon: Droplets,
    title: 'Water Proofing',
    description: 'End-to-end waterproofing systems for terraces, basements, wet areas, and façades.',
  },
  {
    icon: Hammer,
    title: 'Civil Works',
    description: 'Execution support for masonry, patchwork, and civil finishing aligned with project timelines.',
  },
  {
    icon: PaintRoller,
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
            {services.map(({ icon: Icon, title, description }) => (
              <li key={title} className="service-item">
                <div className="service-icon" aria-hidden>
                  <Icon size={24} strokeWidth={1.9} />
                </div>
                <div className="service-label">{title}</div>
                <p className="service-description">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
