import { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./contact-section.css";
import contactRightAnimation from "../../../assets/contact-right.json";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <section
      ref={sectionRef}
      className={`contact-section ${isVisible ? "visible" : ""}`}
      id="contact"
    >
      {/* Video Background */}
      <div className="contact-video-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="contact-video"
        >
          <source src="/videos/bg-main.mp4" type="video/mp4" />
        </video>
        <div className="contact-video-overlay" />
      </div>

      <div className="contact-container">
        <div className="contact-left contact-animate">
          <h2 className="contact-title">Lets Connect!</h2>

          <form className="contact-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Name" />

            <label className="sr-only" htmlFor="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Email" />

            <label className="sr-only" htmlFor="phone">Phone</label>
            <input id="phone" name="phone" placeholder="Phone" />

            <label className="sr-only" htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Message" rows={5} />

            <div className="form-actions">
              <button className="contact-btn" type="submit">Contact Us</button>
            </div>
          </form>
        </div>

        <div className="contact-right contact-animate">
          <div className="contact-visual">
            <Lottie
              animationData={contactRightAnimation}
              loop={true}
              className="contact-lottie"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
