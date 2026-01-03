import "./styles/App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import FeaturedProjects from "./components/FeaturedProjects";
import CursorFollower from "./components/CursorFollower";

export default function App() {
  return (
    <div className="app-shell">
      <CursorFollower />
      <Header />
      <main className="site-main">
        <Hero />
        <FeaturedProjects />
      </main>
    </div>
  );
}
