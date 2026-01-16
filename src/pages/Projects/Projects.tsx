import FeaturedProjects from "../Home/FeaturedProjects";

export default function Projects() {
  return (
    <main className="site-main">
      <section style={{ padding: "100px 60px" }}>
        <h1 style={{ color: "#0a0a0a", margin: 0 }}>Projects</h1>
        <p style={{ color: "#4b5563" }}>Explore our featured residential and commercial projects.</p>
      </section>
      <FeaturedProjects />
    </main>
  );
}
