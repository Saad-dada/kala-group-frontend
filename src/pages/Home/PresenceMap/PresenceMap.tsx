import "./presence-map.css";
import { useNavigate } from "react-router-dom";

const cities = [
  {
    name: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    href: "https://www.google.com/maps/place/Pune",
  },
  {
    name: "Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    href: "https://www.google.com/maps/place/Nagpur",
  },
  {
    name: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    href: "https://www.google.com/maps/place/Delhi",
  },
  {
    name: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    href: "https://www.google.com/maps/place/Mumbai",
  },
];

export default function PresenceMap() {
  const navigate = useNavigate();
  return (
    <section
      className="presence-section site-section"
      aria-labelledby="presence-title"
    >
      <div className="presence-container">
        <div className="presence-copy">
          <p className="presence-eyebrow">Our Presence Across India</p>
          <h2 id="presence-title">Active across key Indian cities</h2>
          <p>
            We execute projects through strong regional presence and coordinated
            site teams in Pune, Nagpur, Delhi, and Mumbai.
          </p>
          <ul
            className="presence-city-list"
            aria-label="Cities where we are present"
          >
            {cities.map((city) => (
              <li key={city.name}>{city.name}</li>
            ))}
          </ul>
          <button
            className="btn btn--outline"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>

        <div
          className="presence-map-card"
          aria-label="Map showing city presence"
        >
          <div className="presence-map-frame">
            <img
              src="/images/new-map.png"
              alt="India map showing Kala Group presence"
              className="presence-static-map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
