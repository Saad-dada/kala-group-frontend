import "./awards.css";
import { useAwards } from "../../hooks/useAwards";

export default function Awards() {
  const { data: awardsData, loading: awardsLoading, error: awardsError } = useAwards();

  return (
    <main className="site-main awards-page">
      <section className="awards-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Awards & Recognition</div>
          <h1 className="awards-headline">
            Celebrating Excellence in Building Services
          </h1>
          <p className="awards-lede">
            Our commitment to quality, innovation, and customer satisfaction has been recognized
            by industry leaders and partners across the construction and paints sector.
          </p>
        </div>
      </section>

      <section className="awards-grid-section site-section">
        <div className="awards-container">
          {awardsLoading ? (
            <div className="loading-state">Loading awards...</div>
          ) : awardsError ? (
            <div className="error-state">Failed to load awards</div>
          ) : (
            <div className="awards-showcase">
              {awardsData.map((award) => (
                <div key={award.id} className="award-showcase-card">
                  {award._embedded?.['wp:featuredmedia']?.[0] && (
                    <div className="award-showcase-image">
                      <img
                        src={award._embedded['wp:featuredmedia'][0].source_url}
                        alt={award._embedded['wp:featuredmedia'][0].alt_text || award.title.rendered}
                        onError={(e) => {
                          // Hide image if it fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="award-showcase-content">
                    <h3>{award.title.rendered}</h3>
                    {award.acf?.description && <p className="award-description">{award.acf.description}</p>}
                    {award.acf?.year && <p className="award-year">{award.acf.year}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}