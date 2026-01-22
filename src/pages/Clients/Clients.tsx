import './clients.css';

export default function Clients() {
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
          <p>
            We're compiling a showcase of our clients, testimonials, and
            long-term partnerships. Stay tuned for highlights and success
            stories.
          </p>
        </div>
      </section>
    </main>
  );
}
