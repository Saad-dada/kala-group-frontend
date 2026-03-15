import "./value-strip.css";

type ValueItem = {
  title: string;
  iconSrc?: string;
  iconAlt?: string;
};

type ValueStripProps = {
  rollerImageSrc?: string;
  rollerImageAlt?: string;
};


const items: ValueItem[] = [
  { title: "60+ RSPs", iconSrc: "/icons/review.png", iconAlt: "60 plus RSPs" },
  {
    title: "Associated with Top Paint Manufacturing Brands",
    iconSrc: "/icons/brush.png",
    iconAlt: "Top paint manufacturing brands",
  },
  {
    title: "Specialization in High Rise Building",
    iconSrc: "/icons/building.png",
    iconAlt: "High rise building specialization",
  },
  {
    title: "Skilled And Safety Trained Work Force",
    iconSrc: "/icons/construction-safety.png",
    iconAlt: "Skilled and safety trained workforce",
  },
  {
    title: "Trusted by leading Developers",
    iconSrc: "/icons/trust.png",
    iconAlt: "Trusted by leading developers",
  },
  {
    title: "Quality Driven Execution",
    iconSrc: "/icons/quality-control.png",
    iconAlt: "Quality driven execution",
  },
  {
    title: "Experienced Project Team",
    iconSrc: "/icons/feedback.png",
    iconAlt: "Experienced project team",
  },
  {
    title: "ISO 9001:2015 Certified",
    iconSrc: "/icons/iso.png",
    iconAlt: "ISO 9001:2015 certified",
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

  return (
    <section className="value-strip" aria-label="Service value highlights">
      <div className="value-strip-boundary">
        <div className="value-strip-visual" aria-hidden="true">
          {resolvedRollerImageSrc ? <img src={resolvedRollerImageSrc} alt={rollerImageAlt} /> : <RollerVisual />}
        </div>

        <div className="value-strip-items">
          {items.map(({ title, iconSrc, iconAlt }) => (
            <article key={title} className="value-item">
              <div className="value-item-icon">{iconSrc ? <img src={iconSrc} alt={iconAlt ?? title} /> : null}</div>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
