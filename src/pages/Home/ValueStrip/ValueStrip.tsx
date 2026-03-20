import "./value-strip.css";
import {
  Award,
  BadgeCheck,
  Building2,
  Handshake,
  Palette,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";

type ValueItem = {
  title: string;
  icon: LucideIcon;
};

type ValueStripProps = {
  rollerImageSrc?: string;
  rollerImageAlt?: string;
};


const items: ValueItem[] = [
  { title: "60+ RSPs", icon: Award },
  {
    title: "Associated with Top Paint Manufacturing Brands",
    icon: Palette,
  },
  {
    title: "Specialization in High Rise Building",
    icon: Building2,
  },
  {
    title: "Skilled And Safety Trained Work Force",
    icon: ShieldCheck,
  },
  {
    title: "Trusted by leading Developers",
    icon: Handshake,
  },
  {
    title: "Quality Driven Execution",
    icon: BadgeCheck,
  },
  {
    title: "Experienced Project Team",
    icon: Users,
  },
  {
    title: "ISO 9001:2015 Certified",
    icon: ScrollText,
  },
];

function RollerVisual() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true" focusable="false">
      <rect x="48" y="20" width="116" height="58" rx="29" fill="url(#rollerBody)" />
      <rect x="38" y="24" width="10" height="50" rx="5" fill="#5f7680" />
      <path d="M48 68H20v18" fill="none" stroke="#2d4450" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 86v22" fill="none" stroke="#1f3037" strokeWidth="8" strokeLinecap="round" />
      <rect x="4" y="106" width="32" height="10" rx="5" fill="#152129" />
      <ellipse cx="104" cy="49" rx="48" ry="18" fill="url(#rollerShine)" opacity="0.55" />
      <defs>
        <linearGradient id="rollerBody" x1="48" y1="20" x2="164" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7db6c8" />
          <stop offset="1" stopColor="#4f879a" />
        </linearGradient>
        <linearGradient id="rollerShine" x1="56" y1="34" x2="152" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d9f2fa" />
          <stop offset="1" stopColor="#d9f2fa" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ValueStrip({ rollerImageSrc, rollerImageAlt = "Paint roller" }: ValueStripProps) {
  const resolvedRollerImageSrc = rollerImageSrc ?? "/images/roller.png";
  const itemsRef = useRef<HTMLDivElement | null>(null);
  // const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const container = itemsRef.current;
    if (!container) return;
    const el = container;
    let mounted = true;
    let paused = false;

    // per-item offset logic removed — autoplay advances by full page width

    // start at first slide
    el.scrollTo({ left: 0 });

    let intervalId: number | null = null;
    function startAutoplay() {
      if (intervalId != null) return;
      intervalId = window.setInterval(() => {
        if (!mounted || paused) return;
        const pageWidth = el.clientWidth;
        const maxScrollLeft = el.scrollWidth - pageWidth;

        // Advance by one full page (itemsPerPage)
        if (el.scrollLeft >= maxScrollLeft - 1) {
          // wrap to start
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const nextLeft = Math.min(el.scrollLeft + pageWidth, maxScrollLeft);
          el.scrollTo({ left: nextLeft, behavior: "smooth" });
        }
      }, 2500);
    }

    startAutoplay();

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    const onTouchStart = () => {
      paused = true;
    };
    const onTouchEnd = () => {
      paused = false;
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      mounted = false;
      if (intervalId != null) window.clearInterval(intervalId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart as EventListener);
      el.removeEventListener("touchend", onTouchEnd as EventListener);
    };
  }, []);

  // Dot navigation: pages of 4 items
  const itemsPerPage = 4;
  const pages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  // const handleDotClick = (pageIndex: number) => {
  //   const container = itemsRef.current;
  //   if (!container) return;
  //   const left = pageIndex * container.clientWidth;
  //   container.scrollTo({ left, behavior: "smooth" });
  //   setCurrentPage(pageIndex);
  // };

  const handleNext = () => {
    const el = itemsRef.current;
    if (!el) return;
    const pageWidth = el.clientWidth;
    const maxScrollLeft = el.scrollWidth - pageWidth;
    const nextLeft = Math.min(el.scrollLeft + pageWidth, maxScrollLeft);
    el.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  const handlePrev = () => {
    const el = itemsRef.current;
    if (!el) return;
    const pageWidth = el.clientWidth;
    const prevLeft = Math.max(el.scrollLeft - pageWidth, 0);
    el.scrollTo({ left: prevLeft, behavior: "smooth" });
  };

  return (
    <section className="value-strip" aria-label="Service value highlights">
      <div className="value-strip-boundary">
        <div className="value-strip-visual" aria-hidden="true">
          {resolvedRollerImageSrc ? <img src={resolvedRollerImageSrc} alt={rollerImageAlt} /> : <RollerVisual />}
        </div>

        <div ref={itemsRef} className="value-strip-items">
          {items.map(({ title, icon: Icon }) => (
            <article key={title} className="value-item">
              <div className="value-item-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.9} />
              </div>
              <h3>{title}</h3>
            </article>
          ))}
        </div>

        {pages > 1 && (
          <div className="mobile-nav" aria-hidden="false">
            <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous"> 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="nav-btn next" onClick={handleNext} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
