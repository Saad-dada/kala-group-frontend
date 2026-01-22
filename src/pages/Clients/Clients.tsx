import './clients.css';

export default function Clients() {
  // Sample brand data - replace with actual data from API
  const brands = [
    { name: "TechCorp", category: "Technology", logo: "🏢" },
    { name: "BuildPro", category: "Construction", logo: "🏗️" },
    { name: "UrbanDev", category: "Real Estate", logo: "🏙️" },
    { name: "GreenBuild", category: "Sustainable", logo: "🌱" },
    { name: "MetroGroup", category: "Infrastructure", logo: "🚇" },
    { name: "PrimeProperties", category: "Residential", logo: "🏠" },
    { name: "CommerceHub", category: "Commercial", logo: "🏪" },
    { name: "FutureWorks", category: "Innovation", logo: "🚀" },
  ];

  return (
    <main className="site-main clients-page">
      <section className="clients-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Our Clients</div>
          <h1 className="clients-headline">
            Trusted Partners & Success Stories
          </h1>
          <p className="clients-lede">
            Discover the brands and organizations that trust us with their building
            projects, from residential developments to commercial complexes.
          </p>
        </div>
      </section>

      <section className="clients-content site-section">
        <div className="clients-container">
          <div className="brands-grid">
            {brands.map((brand, index) => (
              <div key={index} className="brand-card">
                <div className="brand-logo">
                  <span className="brand-icon">{brand.logo}</span>
                </div>
                <div className="brand-info">
                  <h3 className="brand-name">{brand.name}</h3>
                  <p className="brand-category">{brand.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="clients-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
