import "./about.css";
import { useTeam } from "../../hooks/useTeam";
import type { TeamMember } from "../../types/team";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

const progressStats = [
  { value: "11+ years", label: "Years of Experience" },
  { value: "15k+", label: "Apartments Handed Over" },
  { value: "200+", label: "Projects Completed" },
  { value: "30+", label: "Clientele" },
];

const deliveryStats = [
  { value: "1.8 Cr sq.ft", label: "Internal Painting (In Hand)" },
  { value: "2 Cr sq.ft", label: "Internal Painting (Handed Over)" },
  { value: "1 Cr sq.ft", label: "External Painting (In Hand)" },
  { value: "1 Cr sq.ft", label: "External Painting (Handed Over)" },
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

function parseCountValue(value: string) {
  const match = value.match(/([0-9]*\.?[0-9]+)/);
  if (!match) {
    return null;
  }

  const numericText = match[1];
  const numeric = Number.parseFloat(numericText);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  const decimals = numericText.includes(".") ? numericText.split(".")[1].length : 0;
  const index = match.index ?? value.indexOf(numericText);
  const prefix = value.slice(0, index).trim();
  const suffix = value.slice(index + numericText.length).trim();

  return { numeric, decimals, prefix, suffix };
}

function formatCountValue(amount: number, decimals: number, prefix: string, suffix: string) {
  const formatted = decimals > 0 ? amount.toFixed(decimals) : Math.round(amount).toString();
  const parts = [prefix, formatted, suffix].filter(Boolean);
  return parts.join(" ");
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
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
  const progressSectionRef = useRef<HTMLElement>(null);
  const [startProgressCount, setStartProgressCount] = useState(false);

  const parsedDeliveryStats = useMemo(
    () => deliveryStats.map((item) => parseCountValue(item.value)),
    []
  );

  const [animatedDeliveryValues, setAnimatedDeliveryValues] = useState<string[]>(() =>
    deliveryStats.map((item, index) => {
      const parsed = parsedDeliveryStats[index];
      if (!parsed) {
        return item.value;
      }
      return formatCountValue(0, parsed.decimals, parsed.prefix, parsed.suffix);
    })
  );

  useEffect(() => {
    const section = progressSectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setStartProgressCount(true);
          observer.disconnect();
        }
      },
      { threshold: [0.2, 0.35] }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startProgressCount) {
      return;
    }

    const start = performance.now();
    const duration = 1200;
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(progress);

      setAnimatedDeliveryValues(
        deliveryStats.map((item, index) => {
          const parsed = parsedDeliveryStats[index];
          if (!parsed) {
            return item.value;
          }

          const current = parsed.numeric * eased;
          return formatCountValue(current, parsed.decimals, parsed.prefix, parsed.suffix);
        })
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [startProgressCount, parsedDeliveryStats]);

  return (
    <main className="site-main about-page">
      <section className="default-hero">
        <div className="hero-boundary">
          <div className="hero-badge">About Kala Group</div>
          <div className="about-hero-grid">
            <div className="about-hero-copy">
              <h1 className="about-headline">
                Resourceful.
                <br />
                Reliable. Refined
              </h1>
              <p className="about-lede">
                A New Generation firm with a core focus on building activities, at kala we strive for customer satisfaction, without compromising on the quality of our work and structures. We hold an unmatched reputation for perfection, which is backed up by our proven track record: quality, expertise, workmanship, service, competence, and reliability to deliver our impressive portfolio of clients/projects.
              </p>
              <div className="hero-meta">
                <span>Founded in 2014-15</span>
                <span>22+ CR annual revene</span>
                <span>11+ yrs of exp</span>
              </div>
              <div className="about-pills">
                <span>40+CR revenue including trading</span>
                <span>End to end finiishing services</span>
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
          <h2>Delivering scale with systems, safety, and consistency.</h2>
          <p className="about-body">
            With 11+ years of execution experience, 15k+ apartments handed over, and 200+ projects completed, Kala Group has built a dependable delivery model for residential, commercial, and large-format painting works. Our customer-first approach and disciplined site systems help us maintain quality, transparency, and predictable outcomes across every stage of execution.
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
          <p className="about-eyebrow">Revenue profile</p>
          <h2>Built on consistent growth and delivery confidence.</h2>
          <p className="about-body">
            Kala Group currently operates at 22+ Cr annual revenue, with 40+ Cr combined revenue
            including trading. This growth is supported by long-term client trust, repeat business,
            and disciplined execution capability across complex high-rise and finishing projects.
          </p>
        </div>
        <div className="turnover-track">
          <div className="turnover-node">
            <p className="turnover-year">2014-15</p>
            <p className="turnover-value">Founded</p>
            <p className="turnover-note">Beginning of operations</p>
          </div>
          <div className="turnover-connector" aria-hidden="true" />
          <div className="turnover-node">
            <p className="turnover-year">Annual revenue</p>
            <p className="turnover-value">22+ Cr</p>
            <p className="turnover-note">Core operations</p>
          </div>
          <div className="turnover-connector" aria-hidden="true" />
          <div className="turnover-node">
            <p className="turnover-year">Total revenue</p>
            <p className="turnover-value">40+ Cr</p>
            <p className="turnover-note">Including trading</p>
          </div>
        </div>
      </section>

      <section ref={progressSectionRef} className="about-progress site-section">
        <div className="about-section-header">
          <p className="about-eyebrow">Progress & work experience</p>
          <h2>Execution depth across internal and external works.</h2>
          <p className="about-body">
            Our teams execute end-to-end finishing services with measurable output at scale.
            The figures below reflect current in-hand and delivered internal/external painting
            footprints that define our project execution capability.
          </p>
        </div>
        <div className="about-grid">
          {deliveryStats.map((item, index) => (
            <div key={item.value} className="about-tile about-tile-accent">
              <p className="tile-value">{animatedDeliveryValues[index]}</p>
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
        <div className="about-team-grid">
          {teamLoading && <p className="muted">Loading team...</p>}
          {teamError && <p className="muted" style={{ color: "#f87171" }}>Failed to load team</p>}
          {!teamLoading && !teamError && teamData.map(mapTeamMember).map((member) => (
            <div key={member.name} className="about-team-card">
              {member.photo ? (
                <div className="about-team-photo">
                  <img src={member.photo} alt={member.name} />
                </div>
              ) : (
                <div className="about-team-avatar" aria-hidden="true">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="about-team-text">
                <p className="about-team-name">{member.name}</p>
                <p className="about-team-title">{typeof member.title === 'string' ? member.title : ''}</p>
                {member.bio && (
                  <p
                    className="about-team-bio"
                    dangerouslySetInnerHTML={{ __html: member.bio }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/team" className="btn btn--primary">View More Details</Link>
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
