import { useEffect, useState, useRef, useMemo } from "react";
import "./about-section.css";
import { useNavigate } from "react-router-dom";

type Stat = {
  number: string;
  label: string;
  tone: string;
  icon: "experience" | "apartments" | "projects" | "internal-inhand" | "internal-done" | "external-inhand" | "external-done" | "clientele";
};

const statsData: Stat[] = [
    {
      number: "11+",
      label: "Years of Experience",
      tone: "tone-slate",
      icon: "experience",
    },
    {
      number: "15k+",
      label: "Apartments Handed Over",
      tone: "tone-indigo",
      icon: "apartments",
    },
    {
      number: "200+",
      label: "Projects Completed",
      tone: "tone-blue",
      icon: "projects",
    },
    {
      number: "1.8 Cr sqft",
      label: "Internal Painting (In Hand)",
      tone: "tone-rose",
      icon: "internal-inhand",
    },
    {
      number: "2 Cr sqft",
      label: "Internal Painting (Handed Over)",
      tone: "tone-amber",
      icon: "internal-done",
    },
    {
      number: "1 Cr sqft",
      label: "External Painting (In Hand)",
      tone: "tone-teal",
      icon: "external-inhand",
    },
    {
      number: "1 Cr sqft",
      label: "External Painting (Handed Over)",
      tone: "tone-cyan",
      icon: "external-done",
    },
    {
      number: "30+",
      label: "Clientele",
      tone: "tone-violet",
      icon: "clientele",
    },
  ];

function StatIcon({ icon }: { icon: Stat["icon"] }) {
  const commonProps = {
    width: 42,
    height: 42,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  if (icon === "experience") {
    return (
      <svg {...commonProps}>
        <path d="M12 2L14.9 8.1L21.6 9L16.8 13.5L18 20L12 16.7L6 20L7.2 13.5L2.4 9L9.1 8.1L12 2Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (icon === "apartments") {
    return (
      <svg {...commonProps}>
        <path d="M4 21V5.5C4 4.67 4.67 4 5.5 4H12V21M12 9H8M12 13H8M12 17H8M12 6H8M12 21H20V10H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "projects") {
    return (
      <svg {...commonProps}>
        <path d="M8 4V8M16 4V8M4 11H20M7 2H17C18.1 2 19 2.9 19 4V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V4C5 2.9 5.9 2 7 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "internal-inhand") {
    return (
      <svg {...commonProps}>
        <path d="M3 17L10 10L14 14L7 21H3V17ZM12.6 7.4L14.7 5.3C15.5 4.5 16.8 4.5 17.6 5.3L18.7 6.4C19.5 7.2 19.5 8.5 18.7 9.3L16.6 11.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "internal-done") {
    return (
      <svg {...commonProps}>
        <path d="M12 2L4 5V11C4 16 7.4 20.7 12 22C16.6 20.7 20 16 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "external-inhand") {
    return (
      <svg {...commonProps}>
        <path d="M3 20H21M5 20V9L12 4L19 9V20M9 20V14H15V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "external-done") {
    return (
      <svg {...commonProps}>
        <path d="M12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5C7.58 5 4 8.58 4 13C4 17.42 7.58 21 12 21Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 13V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 13L15 14.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8 4L10 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M16 4L14 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M17 21V19C17 16.79 14.76 15 12 15C9.24 15 7 16.79 7 19V21M12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM4 21V19C4 17.67 4.65 16.47 5.7 15.68M20 21V19C20 17.67 19.35 16.47 18.3 15.68" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

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
  const [hasStartedCount, setHasStartedCount] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<string[]>(() =>
    statsData.map((stat) => {
      const parsed = parseNumber(stat.number);
      if (parsed.numeric === 0) return parsed.base;
      return formatAnimated(0, parsed.decimals, parsed.suffix);
    })
  );
    const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const stats = useMemo(() => statsData, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (entry.intersectionRatio >= 0.45) {
            setHasStartedCount(true);
            observer.disconnect();
          }
        }
      },
      { threshold: [0.1, 0.45] }
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
    if (!hasStartedCount) return;

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
  }, [hasStartedCount, stats]);

  return (
    <section
      ref={sectionRef}
      className={`about-section ${isVisible ? "visible" : ""}`}
    >
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-header">
              About <span className="about-highlight">Kala Group</span>
            </h2>
            <h1 className="about-title">
              Resourceful. Reliable
              <br />
              Refined.
            </h1>
            <p className="about-description">
              A New Generation firm with a core focus on building activities, at kala we strive for
              customer satisfaction, without compromising on the quality of our work and
              structures. We hold an unmatched reputation for perfection, which is backed up
              by our proven track record: quality, expertise, workmanship, service, competence,
              and reliability to deliver our impressive portfolio of clients/projects.
            </p>
            <button className="btn btn--outline" onClick={() => navigate("/about")}>Know More About Us</button>
          </div>

          <div className="about-image-wrapper">
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
              className={`stat-card ${stat.tone}`}
            >
              <div className="stat-card-content">
                <div className="stat-copy">
                  <h3 className={`stat-number ${hasStartedCount ? "animated" : ""}`}>{animatedNumbers[index]}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
                <div className="stat-icon-wrap">
                  <StatIcon icon={stat.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
