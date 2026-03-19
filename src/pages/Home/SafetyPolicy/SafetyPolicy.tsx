import "./safety-policy.css";

import { useNavigate } from "react-router-dom";

export default function SafetyPolicy() {
  const navigate = useNavigate();
  return (
    <section className="safety-policy-section site-section">
      <div className="container">
        <div className="safety-grid">
          <div className="safety-content">
            <h2>
              <span className="safety-word">Safety </span>
              <span className="policy-word">Policy</span>
            </h2>
            <p>
              Safety is our utmost priority and we take this as a very important
              aspect of every operation that we perform. We take the safety of
              each and every member of our team very seriously and have chalked
              out dedicated measures to ensure that these protocols are in place
              for everything that they do. We provide comprehensive training for
              safety measures at every level of organizational hierarchy right
              from the labor force to the top management. We provide a
              meticulously safe environment for the people and audit the
              regulations on a regular basis at every single client site.
            </p>
            <button
              className="btn btn--outline"
              onClick={() => navigate("/quality-safety")}
            >
              View More
            </button>
          </div>

          <div className="safety-visual" aria-hidden="true">
            <img
              src="/images/safety-home.jpg"
              alt="Safety measures at Kala Group"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
