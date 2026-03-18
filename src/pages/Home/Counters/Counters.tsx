import { useEffect, useMemo, useRef, useState } from "react";
import "./counters.css";
import useCounters from "../../../hooks/useCounters";
import type { CounterItem } from "../../../types/counter";

const staticCounters: CounterItem[] = [
  { number: "11+", label: "Years of Experience" },
  { number: "15k+", label: "Apartments Handed Over" },
  { number: "200+", label: "Projects Completed" },
  { number: "1.8 Cr sqft", label: "Internal Painting (In Hand)" },
  { number: "2 Cr sqft", label: "Internal Painting (Handed Over)" },
  { number: "1 Cr sqft", label: "External Painting (In Hand)" },
  { number: "1 Cr sqft", label: "External Painting (Handed Over)" },
  { number: "30+", label: "Clientele" },
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
  const { counters: fetchedCounters } = useCounters();
  const displayedCounters = fetchedCounters && fetchedCounters.length > 0 ? fetchedCounters : staticCounters;

  const [hasStartedCount, setHasStartedCount] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<string[]>(() =>
    displayedCounters.map((counter) => {
      const parsed = parseNumber(counter.number);
      if (parsed.numeric === 0) return parsed.base;
      return formatAnimated(0, parsed.decimals, parsed.suffix);
    })
  );

  const sectionRef = useRef<HTMLElement>(null);
  const parsedCounters = useMemo(() => displayedCounters.map((counter) => parseNumber(counter.number)), [displayedCounters]);

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

  // When the displayed counters change (for example when fetched from the API),
  // reset the animated numbers to their starting values if the animation hasn't started yet.
  useEffect(() => {
    if (hasStartedCount) return;
    setAnimatedNumbers(
      parsedCounters.map((item) => (item.numeric === 0 ? item.base : formatAnimated(0, item.decimals, item.suffix)))
    );
  }, [parsedCounters, hasStartedCount]);

  return (
    <section ref={sectionRef} className="home-counters-section site-section" aria-labelledby="home-counters-title">
      <div className="home-counters-container">
        <p className="home-counters-eyebrow">Performance Snapshot</p>
        <h2 id="home-counters-title">Counters</h2>

        <div className="home-counters-grid">
          {displayedCounters.map(({ label }, index) => (
            <article key={label} className="home-counter-card">
              <div className="home-counter-content">
                <h3 className="home-counter-number">{animatedNumbers[index]}</h3>
                <p className="home-counter-label">{label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
