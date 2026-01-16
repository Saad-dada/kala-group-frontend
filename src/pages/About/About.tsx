import AboutSection from "../Home/AboutSection";

export default function About() {
  return (
    <main className="site-main">
      <section style={{ padding: "100px 60px" }}>
        <h1 style={{ color: "#0a0a0a", margin: 0 }}>About Us</h1>
        <p style={{ color: "#4b5563" }}>Learn more about Kala Group.</p>
      </section>
      <AboutSection />
    </main>
  );
}
