import React from "react";
import "./legal-disclaimer.css";

export default function LegalDisclaimer() {
  return (
    <main className="legal-disclaimer-page site-main" style={{ background: '#f8fafc', padding: '60px 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '2.2rem', fontWeight: 700, marginBottom: '18px' }}>Legal Disclaimer – Kala Group</h1>
        <div style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.7 }}>
          <p>The project images, building photographs, developer logos, brand names, and project references displayed on this website are presented strictly for illustrative, informational, and portfolio purposes to demonstrate the nature of work executed or services provided by Kala Group.</p>
          <p>Certain images and references may depict buildings, projects, or developments owned, developed, or managed by third-party developers, builders, or organizations. All trademarks, logos, project names, and brand identities appearing on this website are the property of their respective owners.</p>
          <p>Kala Group does not claim ownership, affiliation, endorsement, or partnership with any developer, builder, or brand unless explicitly stated.</p>
          <p>The use of such images, references, and logos is intended solely to identify projects where our organization may have been involved as a contractor, applicator, or service provider, or where the images are used as representational examples of similar work.</p>
          <p>While reasonable efforts are made to ensure the accuracy and appropriateness of the content presented on this website, Kala Group makes no representations or warranties regarding ownership rights of third party materials displayed for portfolio reference.</p>
          <p>If any developer, copyright holder, brand owner, or authorized representative believes that any image, logo, trademark, or project reference appearing on this website has been used inappropriately, they may contact us with supporting details.</p>
          <p>Upon receiving a legitimate request, Kala Group will promptly review the matter and remove, modify, or update the content where appropriate.</p>
          <p>Kala Group shall not be held liable for any unintentional or incidental use of images, logos, or references belonging to third parties that may appear on this website for portfolio or illustrative purposes.</p>
          <p>The content on this website does not imply any official association, endorsement, or approval by the respective developers, brands, or organizations unless expressly stated.</p>
        </div>
      </div>
    </main>
  );
}
