import { useFirms } from '../../hooks/useFirms';
import type { Firm } from '../../types/firm';
import './firms-grid.css';

type Props = {
  limit?: number;
  showHeading?: boolean;
  heading?: string;
  lede?: string;
};

export default function FirmsGrid({ limit = 6, showHeading = true, heading = 'Our Firms', lede }: Props) {
  const { data, loading, error } = useFirms();

  if (loading) return <p className="firms-loading">Loading firms...</p>;
  if (error) return <p className="firms-error">Failed to load firms.</p>;
  if (!data || data.length === 0) return <p className="firms-empty">No firms found.</p>;

  const stripTags = (html: string) => html.replace(/<[^>]*>/g, '');
  const items = data.slice(0, limit);

  return (
    <section className="firms-grid-section">
      <div className="firms-grid-inner">
        {showHeading && (
          <div className="firms-header">
            <h2 className="firms-title">{heading}</h2>
            {lede && <p className="firms-lede">{lede}</p>}
          </div>
        )}

        <ul className="firms-list">
          {items.map((f: Firm) => {
            const embedded = f._embedded?.['wp:featuredmedia']?.[0];
            const imgUrl = embedded?.source_url ?? embedded?.media_details?.sizes?.thumbnail?.source_url ?? embedded?.media_details?.sizes?.medium?.source_url;
            const titleText = stripTags(f.title.rendered);
            return (
              <li className="firm-item" key={f.id}>
                {imgUrl && (
                  <div className="firm-thumb">
                    <img src={imgUrl} alt={titleText} />
                  </div>
                )}

                <div className="firm-name">
                  <p>{titleText}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
