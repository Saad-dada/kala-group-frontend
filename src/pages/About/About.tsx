import "./about.css";
import { useTeam } from "../../hooks/useTeam";
import type { TeamMember } from "../../types/team";
import { Link } from "react-router-dom";

const progressStats = [
  { value: "11+ years", label: "Building services across Mumbai with a customer-first mindset" },
  { value: "200+ projects", label: "Residential, commercial, restoration, and large-format painting" },
  { value: "30+ clientele", label: "Developers, societies, corporates, and institutional partners" },
  { value: "18 Cr revenue", label: "Scaled from 0.4 Cr in our first year of operations" },
];

const deliveryStats = [
  { value: "1.8 Cr sq.ft", label: "Internal painting currently in hand" },
  { value: "2 Cr sq.ft", label: "Internal painting delivered" },
  { value: "1 Cr sq.ft", label: "External painting currently in hand" },
  { value: "1 Cr sq.ft", label: "External painting delivered" },
];

const brandPartners = [
  { name: "Asian Paints", image: "/images/brands/asian.jpg" },
  { name: "Berger Paints", image: "/images/brands/berger.png" },
  { name: "Jotun", image: "/images/brands/jotun.png" },
  { name: "Dulux", image: "/images/brands/dulux.png" },
  { name: "Akzo Nobel", image: "/images/brands/akzo.png" },
  { name: "Hind", image: "/images/brands/hind.png" },
  { name: "Artisans", image: "/images/brands/artisans.png" },
];

function formatLabel(key: string) {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function mapTeamMember(member: TeamMember) {
  const name = typeof member.title === "object" && member.title?.rendered ? member.title.rendered : "";
  // Fix: get post from member.acf.post
  const title = member.acf && typeof member.acf === 'object' && 'post' in member.acf ? String((member.acf as any).post) : "";
  const bio = (member.acf?.bio as string | undefined) ?? (member.content?.rendered ?? "");
  const photo = (member.acf?.photo as string | undefined) ?? "";

  const details = Object.entries(member.acf ?? {})
    .filter(([key, value]) => value && !["photo", "bio", "title"].includes(key))
    .map(([key, value]) => ({ key: formatLabel(key), value: String(value) }));

  return { name, title, bio, photo, details };
}

export default function About() {
  const { data: teamData, loading: teamLoading, error: teamError } = useTeam();

  return (
    <main className="site-main about-page">
      <section className="about-hero">
        <div className="hero-boundary">
          <div className="hero-badge">About Kala Group</div>
          <div className="about-hero-grid">
            <div className="about-hero-copy">
              <h1 className="about-headline">
                Building with purpose.
                <br />
                Delivering with integrity.
              </h1>
              <p className="about-lede">
                We are a new-generation building services firm headquartered in Mumbai—pairing
                customer-first delivery with uncompromised quality, workmanship, and schedule
                discipline across every engagement.
              </p>
              <div className="hero-meta">
                <span>Founded 2014-15</span>
                <span>18 Cr annual revenue</span>
                <span>Mumbai & Western India footprint</span>
              </div>
              <div className="about-pills">
                <span>Customer-first delivery</span>
                <span>Quality without compromise</span>
                <span>Proven multi-discipline track record</span>
              </div>
            </div>
            <div className="about-hero-media">
              <div className="hero-image-frame">
                <img src="/images/about-building.jpg" alt="Kala Group project" />
                <div className="hero-image-caption">
                  <span>Trusted in Mumbai</span>
                  <strong>End-to-end civil & painting services</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story site-section">
        <div className="about-section-header">
          <p className="about-eyebrow">Who we are</p>
          <h2>Delivering excellence across every stroke.</h2>
          <p className="about-body">
            We are a one-stop civil service partner known for perfection and reliability. Our team
            combines on-site mastery with tight project governance to meet demanding timelines.
            Each project is approached with empathy toward client needs and a solution-centric
            mindset, enabling long-term partnerships and repeat engagements.
          </p>
        </div>
        <div className="about-grid">
          {progressStats.map((item) => (
            <div key={item.value} className="about-tile">
              <p className="tile-value">{item.value}</p>
              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-turnover site-section">
        <div className="about-section-header">
          <p className="about-eyebrow">Annual turnover</p>
          <h2>Scaling steadily since inception.</h2>
          <p className="about-body">
            From a 0.4 Cr first-year turnover to an 18 Cr business today, Kala has compounded
            growth through disciplined delivery, a loyal client base, and expanding project
            complexity across Mumbai.
          </p>
        </div>
        <div className="turnover-track">
          <div className="turnover-node">
            <p className="turnover-year">2014-15</p>
            <p className="turnover-value">0.4 Cr</p>
            <p className="turnover-note">First-year revenue</p>
          </div>
          <div className="turnover-connector" aria-hidden="true" />
          <div className="turnover-node">
            <p className="turnover-year">Today</p>
            <p className="turnover-value">18 Cr</p>
            <p className="turnover-note">Driven by disciplined execution</p>
          </div>
          <div className="turnover-connector" aria-hidden="true" />
          <div className="turnover-node">
            <p className="turnover-year">Growth</p>
            <p className="turnover-value">+17.6 Cr</p>
            <p className="turnover-note">Over eight years of expansion</p>
          </div>
        </div>
      </section>

      <section className="about-progress site-section">
        <div className="about-section-header">
          <p className="about-eyebrow">Progress & work experience</p>
          <h2>Scale, volume, and repeatability.</h2>
          <p className="about-body">
            Our field teams deliver large-format painting and restoration at pace, balancing safety,
            finish, and schedule discipline. Below is a snapshot of current work in hand and
            recently delivered scope.
          </p>
        </div>
        <div className="about-grid">
          {deliveryStats.map((item) => (
            <div key={item.value} className="about-tile about-tile-accent">
              <p className="tile-value">{item.value}</p>
              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-team site-section">
        <div className="about-section-header">
          <p className="about-eyebrow">Leadership team</p>
          <h2>People behind Kala Group.</h2>
          <p className="about-body">
            Seasoned founders and directors who combine financial rigor, on-ground execution, and
            long-term client partnerships.
          </p>
        </div>
        <div className="team-grid">
          {teamLoading && <p className="muted">Loading team...</p>}
          {teamError && <p className="muted" style={{ color: "#f87171" }}>Failed to load team</p>}
          {!teamLoading && !teamError && teamData.map(mapTeamMember).map((member) => (
            <div key={member.name} className="team-card">
              {member.photo ? (
                <div className="team-photo">
                  <img src={member.photo} alt={member.name} />
                </div>
              ) : (
                <div className="team-avatar" aria-hidden="true">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="team-text">
                <p className="team-name">{member.name}</p>
                <p className="team-title">{typeof member.title === 'string' ? member.title : ''}</p>
                {member.bio && (
                  <p
                    className="team-bio"
                    dangerouslySetInnerHTML={{ __html: member.bio }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/team" className="view-more-btn">View More Details</Link>
        </div>
      </section>

      <section className="about-brands site-section">
        <div className="about-section-header">
          <p className="about-eyebrow">Brand associations</p>
          <h2>Trusted by leading paint and coating majors.</h2>
          <p className="about-body">
            Partnerships with global and national brands ensure best-in-class materials, methods,
            and technical support across every project stage.
          </p>
        </div>
        <div className="brand-grid">
          {brandPartners.map((brand) => (
            <div key={brand.name} className="brand-card">
              {brand.image ? <img src={brand.image} alt={brand.name} /> : <span>{brand.name}</span>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
