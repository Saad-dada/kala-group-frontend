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
import SafetyPolicy from "./SafetyPolicy/SafetyPolicy";

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
      <SafetyPolicy />
      <ContactSection />
      <Firms />
    </main>
  );
}
