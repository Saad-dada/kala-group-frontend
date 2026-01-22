import './contact.css';
import ContactSection from "../Home/ContactSection/ContactSection";

export default function Contact() {
  return (
    <main className="site-main contact-page">
      <section className="contact-hero">
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
    </main>
  );
}
