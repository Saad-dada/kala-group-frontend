import { useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Lenis from "lenis";
import "./styles/App.css";
import Header from "./components/layout/Header";
import CursorFollower from "./components/ui/CursorFollower";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Team from "./pages/Team/Team";
import Awards from "./pages/Awards/Awards";
import Clients from "./pages/Clients/Clients";
import QualitySafety from "./pages/QualitySafety";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.5 });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="app-shell">
        <CursorFollower />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/award" element={<Navigate to="/awards" replace />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/quality-safety" element={<QualitySafety />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
