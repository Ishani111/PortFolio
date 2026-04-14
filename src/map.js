import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

function RecenterMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function MapSearch() {
  const [position, setPosition] = useState([26.8467, 80.9462]);
  const [search, setSearch] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  const searchLocation = async () => {
    if (!search) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
    );

    const data = await res.json();

    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setPosition([lat, lon]);
      setIsCurrent(false);
    } else {
      alert("Location not found");
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setPosition([lat, lon]);
        setIsCurrent(true);
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  return (
    <div className="map-page">
      <div className="map-card">

        <div className="map-header">
          <h2 className="map-title">Map Search</h2>
          <span className="map-sub">Find any location</span>
        </div>

        <div className="map-input-row">
          <input
            className="map-input"
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="map-btn" onClick={searchLocation}>
            Search
          </button>

          <button className="map-btn" onClick={getCurrentLocation}>
            My Location
          </button>
        </div>

        <div className="map-container">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />

            <RecenterMap position={position} />

            {/* 📍 Normal marker (for searched places) */}
            {!isCurrent && (
              <Marker position={position}>
                <Popup>{search || "Location"}</Popup>
              </Marker>
            )}

            {isCurrent && (
              <CircleMarker
                center={position}
                radius={8}
                pathOptions={{
                  color: "var(--accent)",
                  fillColor: "var(--accent)",
                  fillOpacity: 0.7,
                }}
              >
                <Popup>You are here</Popup>
              </CircleMarker>
            )}

          </MapContainer>
        </div>

      </div>
    </div>
  );
}

export default MapSearch;