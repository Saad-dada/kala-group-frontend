import FirmsGrid from '../FirmsGrid/FirmsGrid';
import './ourfirms.css';

type Props = {
  heading?: string;
  lede?: string;
  limit?: number;
};

export default function OurFirms({ heading = 'Our Firms', lede, limit = 6 }: Props) {
  return (
    <section className="our-firms-section site-section">
      <div className="our-firms-container">
        <div className="our-firms-header">
          <h2 className="our-firms-title">{heading}</h2>
          {lede && <p className="our-firms-lede">{lede}</p>}
        </div>

        <FirmsGrid showHeading={false} limit={limit} />
      </div>
    </section>
  );
}
