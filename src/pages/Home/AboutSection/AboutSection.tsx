import { useEffect, useState, useRef, useMemo } from "react";
import "./about-section.css";

type Stat = {
  number: string;
  label: string;
  image: string;
};

const statsData: Stat[] = [
    {
      number: "11+",
      label: "Years of Experience",
      image: "linear-gradient(135deg, #1f2937, #0f172a)",
    },
    {
      number: "15+",
      label: "Apartments Handed Over",
      image: "linear-gradient(135deg, #172554, #0b1224)",
    },
    {
      number: "200+",
      label: "Projects Completed",
      image: "linear-gradient(135deg, #1c1917, #0f0a0a)",
    },
    {
      number: "1.8 Cr",
      label: "Internal Painting (In Hand)",
      image: "linear-gradient(135deg, #1b1d2e, #0f1624)",
    },
    {
      number: "2 Cr",
      label: "Internal Painting (Handed Over)",
      image: "linear-gradient(135deg, #2a1b1f, #12090d)",
    },
    {
      number: "1 Cr",
      label: "External Painting (In Hand)",
      image: "linear-gradient(135deg, #0f1e1a, #07100c)",
    },
    {
      number: "1 Cr",
      label: "External Painting (Handed Over)",
      image: "linear-gradient(135deg, #1e1a0f, #0f0c07)",
    },
    {
      number: "30+",
      label: "Clientele",
      image: "linear-gradient(135deg, #231f4a, #0f0c1f)",
    },
  ];

function parseNumber(value: string) {
  const match = value.match(/([0-9]*\.?[0-9]+)/);
  if (!match) return { base: value, numeric: 0, decimals: 0, suffix: "" };
  const numeric = parseFloat(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = value.replace(match[1], "").trim();
  return { base: value, numeric, decimals, suffix };
}

function formatAnimated(numeric: number, decimals: number, suffix: string) {
  const formatted = decimals > 0 ? numeric.toFixed(decimals) : Math.round(numeric).toString();
  if (!suffix) return formatted;
  const separator = suffix === "+" ? "" : " ";
  return `${formatted}${separator}${suffix}`;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<string[]>(() =>
    statsData.map((stat) => stat.number)
  );
  const sectionRef = useRef<HTMLElement>(null);

  const stats = useMemo(() => statsData, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const start = performance.now();
    const duration = 1200;
    const parsed = stats.map((stat) => parseNumber(stat.number));
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(progress);

      setAnimatedNumbers(
        parsed.map((item) => {
          if (item.numeric === 0) return item.base;
          const current = item.numeric * eased;
          return formatAnimated(current, item.decimals, item.suffix);
        })
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, stats]);

  return (
    <section
      ref={sectionRef}
      className={`about-section ${isVisible ? "visible" : ""}`}
    >
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-header about-animate">
              About <span className="about-highlight">Kala Group</span>
            </h2>
            <h1 className="about-title about-animate about-delay-1">
              Building with purpose.
              <br />
              Delivering with integrity.
            </h1>
            <p className="about-description about-animate about-delay-2">
              A New Generation firm with a core focus on building activities, at kala we strive for
              customer satisfaction, without compromising on the quality of our work and
              structures. We hold an unmatched reputation for perfection, which is backed up
              by our proven track record: quality, expertise, workmanship, service, competence,
              and reliability to deliver our impressive portfolio of clients/projects.
            </p>
            <button className="about-cta about-animate about-delay-3">
              Know More About Us
            </button>
          </div>

          <div className="about-image-wrapper about-animate about-delay-2">
            <div className="about-image-container">
              <img
                src="/images/about-building.jpg"
                alt="Kala Group Building"
                className="about-building-image"
              />
            </div>
          </div>
        </div>

        <div className="about-stats">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-card about-animate about-delay-${4 + index}`}
            >
              <div
                className="stat-card-bg"
                style={{ background: stat.image }}
              />
              <div className="stat-card-overlay" />
              <div className="stat-card-content">
                <h3 className="stat-number animated">{animatedNumbers[index]}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
              <div className="stat-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
