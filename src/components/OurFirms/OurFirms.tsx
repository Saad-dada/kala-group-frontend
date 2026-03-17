import './ourfirms.css';

export default function OurFirms() {
  return (
    <section className="our-firms-section site-section">
      <div className="our-firms-container">
        <div className="our-firms-header">
          <h2 className="our-firms-title">Our Firms</h2>
        </div>

        <div className="our-firms-grid" aria-label="Our firms">
          <article className="our-firms-group">
            <h3 className="our-firms-group-title">Contracting Firms</h3>
            <ul className="our-firms-list">
              <li>Kala Engineering</li>
              <li>K. Navadia Construction Pvt. Ltd.</li>
            </ul>
          </article>

          <article className="our-firms-group">
            <h3 className="our-firms-group-title">Manufacturing Firms</h3>
            <ul className="our-firms-list">
              <li>DSR Tradelinks LLP</li>
              <li>Kalawati Multiventures Pvt. Ltd.</li>
            </ul>
          </article>

          <article className="our-firms-group">
            <h3 className="our-firms-group-title">Trading Firms</h3>
            <ul className="our-firms-list">
              <li>Jain Electric and Hardware</li>
              <li>Kanav Colours</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
