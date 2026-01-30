import './contact.css';
import ContactInfo from "./ContactInfo";
import ContactSection from "../Home/ContactSection/ContactSection";
import OurFirms from "../../components/OurFirms/OurFirms";

export default function Contact() {

  return (
    <main className="site-main contact-page">
      <section className="default-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Get In Touch</div>
          <h1 className="contact-headline">
            Let's Build Something Amazing Together
          </h1>
          <p className="contact-lede">
            Tell us about your project — we’ll reply fast. From initial consultation
            to project completion, we're here to bring your vision to life.
          </p>
        </div>
      </section>
      <ContactSection />
      <ContactInfo />

      {/* Our firms (reusable component) */}
      <OurFirms limit={6} />
    </main>
  );
}
