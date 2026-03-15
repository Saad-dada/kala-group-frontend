import { useMemo } from "react";
import { useClients } from "../../../hooks/useClients";
import type { Client } from "../../../types/client";
import "./moving-clients.css";

function getImageUrl(client: Client) {
  const media = client._embedded?.["wp:featuredmedia"]?.[0];
  return (
    media?.source_url ??
    media?.media_details?.sizes?.thumbnail?.source_url ??
    media?.media_details?.sizes?.medium?.source_url ??
    ""
  );
}

export default function MovingClients() {
  const { data, loading, error } = useClients();

  const clientsWithImages = useMemo(
    () => data.filter((client) => Boolean(getImageUrl(client))),
    [data]
  );

  const marqueeItems = useMemo(() => [...clientsWithImages, ...clientsWithImages], [clientsWithImages]);

  return (
    <section className="moving-clients-section site-section" aria-labelledby="moving-clients-title">
      <div className="moving-clients-container">
        <p className="moving-clients-eyebrow">Trusted by leading developers</p>
        <h2 id="moving-clients-title">Our Clients</h2>

        {loading && <p className="moving-clients-state">Loading clients...</p>}
        {error && !loading && <p className="moving-clients-state">Failed to load clients.</p>}

        {!loading && !error && clientsWithImages.length > 0 && (
          <div className="clients-marquee" aria-label="Scrolling client logos">
            <div className="clients-marquee-track">
              {marqueeItems.map((client, index) => (
                <div className="clients-marquee-item" key={`${client.id}-${index}`}>
                  <img src={getImageUrl(client)} alt={client.title.rendered.replace(/<[^>]*>/g, "")} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
