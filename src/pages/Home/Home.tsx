import Hero from "./Hero";
import FeaturedProjects from "./FeaturedProjects";
import AboutSection from "./AboutSection";
import Firms from "./Firms";
import ContactSection from "./ContactSection";

export default function Home() {
  return (
    <main className="site-main">
      <Hero />
      <FeaturedProjects />
      <AboutSection />
      <ContactSection />
      <Firms />
    </main>
  );
}
