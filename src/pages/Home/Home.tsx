import Hero from "./Hero";
import ValueStrip from "./ValueStrip";
import FeaturedProjects from "./FeaturedProjects";
import AboutSection from "./AboutSection";
import Firms from "./Firms";
import ContactSection from "./ContactSection";
import NewSitesBagged from "./NewSitesBagged";
import PresenceMap from "./PresenceMap";
import MovingClients from "./MovingClients";
import Counters from "./Counters";

export default function Home() {
  return (
    <main className="site-main">
      <Hero />
      <ValueStrip />
      <MovingClients />
      <FeaturedProjects />
      <AboutSection />
      <PresenceMap />
      <NewSitesBagged />
      <Counters />
      {/* Safety Policy Section */}
      <section className="safety-policy-section site-section" style={{ background: '#f8fafc', padding: '60px 0', marginBottom: '0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ color: '#0f172a', fontSize: '2.2rem', fontWeight: 700, marginBottom: '18px' }}>
            <span style={{ color: '#222', fontWeight: 700 }}>Safety </span>
            <span style={{ color: '#e53935', fontWeight: 700 }}>Policy</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#334155', lineHeight: 1.7 }}>
            Safety is our utmost priority and we take this as a very important aspect of every operation that we perform.<br />
            We take the safety of each and every member of our team very seriously and have chalked out dedicated measures to ensure that these protocols are in place for everything that they do.<br />
            We provide comprehensive training for safety measures at every level of organizational hierarchy right from the labor force to the top management.<br />
            We provide a meticulously safe environment for the people and audit the regulations on a regular basis at every single client site.
          </p>
        </div>
      </section>
      <ContactSection />
      <Firms />
    </main>
  );
}
