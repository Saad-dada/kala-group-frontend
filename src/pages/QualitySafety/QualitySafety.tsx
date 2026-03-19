import "./quality-safety.css";
import type { ReactNode } from "react";
import useQualitySafetyImages from "../../hooks/useQualitySafetyImages";

const qualityPoints = [
  "Careful surface preparation before painting",
  "Use of high-quality paints and coating systems",
  "Application as per manufacturer specifications",
  "Multiple levels of supervision and quality checks",
  "Final inspection before project handover",
];

const safetyCulturePoints = [
  "Safety helmets",
  "Safety harnesses for height work",
  "Safety gloves",
  "Safety goggles",
  "Reflective jackets",
  "Safety footwear",
];

const heightSafetyPoints = [
  "Use of certified scaffolding and access platforms",
  "Regular inspection of ladders and elevated work equipment",
  "Fall arrest systems installed at all elevated work zones",
  "Trained supervisors overseeing all height operations",
  "No work at height during adverse weather conditions",
];

const riskPlanningPoints = [
  "Pre-project site risk assessments conducted",
  "Hazard identification and mitigation planning",
  "Safety briefings before every shift",
  "Clear demarcation of restricted and work zones",
  "Documented safety plans shared with all crew members",
];

const emergencyPoints = [
  "First aid kits available at all project sites",
  "Trained first-aiders present during operations",
  "Emergency contact numbers posted on-site",
  "Defined evacuation routes and assembly points",
  "Incident reporting and review procedures in place",
];

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="qs-checklist">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function SectionBlock({
  eyebrow,
  title,
  imageAlt,
  imageSrc,
  children,
  last = false,
}: {
  eyebrow: string;
  title: string;
  imageAlt: string;
  imageSrc: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`site-section qs-section${last ? " qs-section--last" : ""}`}>
      <div className="qs-container">
        <div className="qs-section-head">
          <p className="qs-eyebrow">{eyebrow}</p>
          <h2 className="qs-section-title">{title}</h2>
        </div>
        <div className="qs-image-frame">
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className="qs-content">{children}</div>
      </div>
    </section>
  );
}

export default function QualitySafety() {
  const { images } = useQualitySafetyImages();

  const img = (n: 1 | 2 | 3 | 4 | 5 | 6 | 7) => images?.[`image_${n}`] ?? "";

  return (
    <main className="site-main quality-safety-page">
      <section className="default-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Quality &amp; Safety</div>
          <h1 className="services-headline">Quality &amp; Safety: Our Top Priority</h1>
          <p className="services-lede">
            At Kala Coloring Landmarks, we are committed to delivering the highest standards of quality and ensuring the safety of every worker on every project. Our rigorous processes, skilled teams, and unwavering focus on safety make us a trusted partner for landmark projects across the region.
          </p>
        </div>
      </section>

      <SectionBlock
        eyebrow="Quality & Safety"
        title="Built on Quality. Driven by Safety."
        imageAlt="Quality and safety visual"
        imageSrc={img(1)}
      >
        <p>At Kala Coloring Landmarks, quality workmanship and worker safety are the foundation of every project.</p>
        <p>Our systems ensure that every project meets the highest standards of durability, finish quality, and worker safety.</p>
        <p className="qs-goal">
          <strong>Our Goal:</strong> Deliver exceptional finishing quality while ensuring zero harm on every project site.
        </p>
      </SectionBlock>

      <SectionBlock
        eyebrow="Our Standards"
        title="Our Commitment to Quality"
        imageAlt="Quality inspection"
        imageSrc={img(2)}
      >
        <Checklist items={qualityPoints} />
      </SectionBlock>

      <SectionBlock
        eyebrow="People First"
        title="Safety First Culture"
        imageAlt="Safety gear"
        imageSrc={img(3)}
      >
        <Checklist items={safetyCulturePoints} />
      </SectionBlock>

      <SectionBlock
        eyebrow="Execution Safety"
        title="Working at Height Safety"
        imageAlt="Working at height safety"
        imageSrc={img(4)}
      >
        <Checklist items={heightSafetyPoints} />
      </SectionBlock>

      <SectionBlock
        eyebrow="Planning"
        title="Risk Assessment & Site Planning"
        imageAlt="Risk planning"
        imageSrc={img(5)}
      >
        <Checklist items={riskPlanningPoints} />
      </SectionBlock>

      <SectionBlock
        eyebrow="Site Controls"
        title="Equipment & Material Handling"
        imageAlt="Equipment and materials"
        imageSrc={img(6)}
      >
        <p>
          All tools and equipment are regularly inspected. Strict procedures are followed for handling paints,
          safe storage of materials, ventilation during interior painting, and proper waste management.
        </p>
      </SectionBlock>

      <SectionBlock
        eyebrow="Preparedness"
        title="Emergency Preparedness"
        imageAlt="Emergency preparedness"
        imageSrc={img(7)}
        last
      >
        <Checklist items={emergencyPoints} />
        <p className="qs-closing">
          At Kala Coloring Landmarks, we believe that quality and safety go hand in hand. Our disciplined
          processes ensure superior finishing quality, operational safety, and client satisfaction.
        </p>
      </SectionBlock>
    </main>
  );
}