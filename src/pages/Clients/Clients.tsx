import './clients.css';
import { useClients } from '../../hooks/useClients';
import type { Client } from '../../types/client';
import { Link } from 'react-router-dom';

export default function Clients() {
  const { data, loading, error } = useClients();

  const getImageUrl = (c: Client) => {
    const embedded = c._embedded?.['wp:featuredmedia']?.[0];
    return embedded?.source_url ?? embedded?.media_details?.sizes?.thumbnail?.source_url ?? embedded?.media_details?.sizes?.medium?.source_url ?? null;
  };

  return (
    <main className="site-main clients-page">
      <section className="default-hero">
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
          {loading && <p style={{color:'#e5e7eb'}}>Loading clients...</p>}
          {error && <p style={{color:'#fca5a5'}}>Failed to load clients.</p>}

          {!loading && !error && (
            <div className="clients-logos">
              {data.map((c: Client) => {
                const img = getImageUrl(c);
                return (
                  <Link className="client-tile" key={c.id} to={`/projects?builder=${encodeURIComponent(c.slug)}`}>
                    {img ? <img src={img} alt={(c.title?.rendered ?? 'client').replace(/<[^>]*>/g, '')} /> : <div className="client-placeholder" />}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
