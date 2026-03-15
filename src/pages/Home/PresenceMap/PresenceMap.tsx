import "./presence-map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

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

function createCityPinDivIcon(cityName: string) {
  return L.divIcon({
    className: "presence-city-marker-wrap",
    html: `<span class="presence-city-marker"></span><span class="presence-city-marker-label">${cityName}</span>`,
    iconSize: [90, 24],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
}

export default function PresenceMap() {
  return (
    <section className="presence-section site-section" aria-labelledby="presence-title">
      <div className="presence-container">
        <div className="presence-copy">
          <p className="presence-eyebrow">Our Presence Across India</p>
          <h2 id="presence-title">Active across key Indian cities</h2>
          <p>
            We execute projects through strong regional presence and coordinated site teams in
            Pune, Nagpur, Delhi, and Mumbai.
          </p>
          <ul className="presence-city-list" aria-label="Cities where we are present">
            {cities.map((city) => (
              <li key={city.name}>{city.name}</li>
            ))}
          </ul>
        </div>

        <div className="presence-map-card" aria-label="Map showing city presence">
          <div className="presence-map-frame">
            <MapContainer
              center={[22.5937, 79.9629]}
              zoom={5}
              scrollWheelZoom={false}
              className="presence-leaflet-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {cities.map((city) => (
                <Marker
                  key={city.name}
                  position={[city.lat, city.lng]}
                  icon={createCityPinDivIcon(city.name)}
                >
                  <Popup>
                    <strong>{city.name}</strong>
                    <br />
                    <a href={city.href} target="_blank" rel="noreferrer">
                      Open in Google Maps
                    </a>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
