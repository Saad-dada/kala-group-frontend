import { useEffect, useMemo, useRef, useState } from "react";
import "./counters.css";
import {
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  HardHat,
  PaintRoller,
  Ruler,
  Square,
  Users,
  type LucideIcon,
} from "lucide-react";

type CounterItem = {
  number: string;
  label: string;
  icon: LucideIcon;
};

const counters: CounterItem[] = [
  { number: "11+", label: "Years of Experience", icon: BriefcaseBusiness },
  { number: "15k+", label: "Apartments Handed Over", icon: Building2 },
  { number: "200+", label: "Projects Completed", icon: ClipboardCheck },
  { number: "1.8 Cr sqft", label: "Internal Painting (In Hand)", icon: PaintRoller },
  { number: "2 Cr sqft", label: "Internal Painting (Handed Over)", icon: HardHat },
  { number: "1 Cr sqft", label: "External Painting (In Hand)", icon: Ruler },
  { number: "1 Cr sqft", label: "External Painting (Handed Over)", icon: Square },
  { number: "30+", label: "Clientele", icon: Users },
];

function parseNumber(value: string) {
  const match = value.match(/([0-9]*\.?[0-9]+)/);
  if (!match) return { base: value, numeric: 0, decimals: 0, suffix: "" };
  const numeric = Number.parseFloat(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = value.replace(match[1], "").trim();
  return { base: value, numeric, decimals, suffix };
}

function formatAnimated(numeric: number, decimals: number, suffix: string) {
  const formatted = decimals > 0 ? numeric.toFixed(decimals) : Math.round(numeric).toString();
  if (!suffix) return formatted;
  return `${formatted}${suffix === "+" ? "" : " "}${suffix}`;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Counters() {
  const [hasStartedCount, setHasStartedCount] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<string[]>(() =>
    counters.map((counter) => {
      const parsed = parseNumber(counter.number);
      if (parsed.numeric === 0) return parsed.base;
      return formatAnimated(0, parsed.decimals, parsed.suffix);
    })
  );

  const sectionRef = useRef<HTMLElement>(null);
  const parsedCounters = useMemo(() => counters.map((counter) => parseNumber(counter.number)), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setHasStartedCount(true);
          observer.disconnect();
        }
      },
      { threshold: [0.2, 0.35] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStartedCount) return;

    const start = performance.now();
    const duration = 1200;
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(progress);

      setAnimatedNumbers(
        parsedCounters.map((item) => {
          if (item.numeric === 0) return item.base;
          return formatAnimated(item.numeric * eased, item.decimals, item.suffix);
        })
      );

      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hasStartedCount, parsedCounters]);

  return (
    <section ref={sectionRef} className="home-counters-section site-section" aria-labelledby="home-counters-title">
      <div className="home-counters-container">
        <p className="home-counters-eyebrow">Performance Snapshot</p>
        <h2 id="home-counters-title">Counters</h2>

        <div className="home-counters-grid">
          {counters.map(({ label, icon: Icon }, index) => (
            <article key={label} className="home-counter-card">
              <div className="home-counter-content">
                <h3 className="home-counter-number">{animatedNumbers[index]}</h3>
                <p className="home-counter-label">{label}</p>
              </div>
              <div className="home-counter-icon" aria-hidden>
                <Icon size={28} strokeWidth={2} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
