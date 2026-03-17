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

  return (
    <section className="value-strip" aria-label="Service value highlights">
      <div className="value-strip-boundary">
        <div className="value-strip-visual" aria-hidden="true">
          {resolvedRollerImageSrc ? <img src={resolvedRollerImageSrc} alt={rollerImageAlt} /> : <RollerVisual />}
        </div>

        <div className="value-strip-items">
          {items.map(({ title, icon: Icon }) => (
            <article key={title} className="value-item">
              <div className="value-item-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.9} />
              </div>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
