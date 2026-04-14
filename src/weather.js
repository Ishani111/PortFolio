import React, { useState } from "react";
import "./weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (city.trim() === "") return;
    setLoading(true);
    setError("");
    setData(null);
    const apiKey = "1d6c6a04fef5d9763e8370dcfb448394";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const result = await res.json();
    setLoading(false);
    if (result.cod !== 200) {
      setError("City not found. Please check the name and try again.");
      return;
    }
    setData(result);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") getWeather();
  };

  const getEmoji = (weather) => {
    if (weather.includes("Cloud")) return "☁";
    if (weather.includes("Rain"))  return "🌧";
    if (weather.includes("Clear")) return "☀";
    if (weather.includes("Snow"))  return "❄";
    if (weather.includes("Thunder")) return "⚡";
    return "🌈";
  };

  const getFeelsLabel = (temp) => {
    if (temp <= 0)  return "Freezing";
    if (temp <= 10) return "Cold";
    if (temp <= 20) return "Cool";
    if (temp <= 30) return "Warm";
    return "Hot";
  };

  return (
    <div className="wx-page">
      <div className="wx-card">

        <div className="wx-header">
          <h2 className="wx-title">Weather</h2>
          <p className="wx-sub">Live conditions by city</p>
        </div>

        <div className="wx-search-row">
          <input
            className="wx-input"
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="wx-btn" onClick={getWeather} disabled={loading}>
            {loading ? "..." : "Search"}
          </button>
        </div>

        {error && <p className="wx-error">{error}</p>}

        {data && (
          <div className="wx-result">
            <div className="wx-city-row">
              <div>
                <p className="wx-city-name">{data.name}, {data.sys.country}</p>
                <p className="wx-condition">{data.weather[0].description}</p>
              </div>
              <span className="wx-emoji">{getEmoji(data.weather[0].main)}</span>
            </div>

            <div className="wx-temp-block">
              <span className="wx-temp">{Math.round(data.main.temp)}°</span>
              <span className="wx-temp-unit">C</span>
              <span className="wx-feels">Feels {getFeelsLabel(data.main.feels_like)}</span>
            </div>

            <div className="wx-stats">
              <div className="wx-stat-item">
                <span className="wx-stat-label">Feels like</span>
                <span className="wx-stat-value">{Math.round(data.main.feels_like)}°C</span>
              </div>
              <div className="wx-stat-item">
                <span className="wx-stat-label">Humidity</span>
                <span className="wx-stat-value">{data.main.humidity}%</span>
              </div>
              <div className="wx-stat-item">
                <span className="wx-stat-label">Wind</span>
                <span className="wx-stat-value">{data.wind.speed} m/s</span>
              </div>
              <div className="wx-stat-item">
                <span className="wx-stat-label">High / Low</span>
                <span className="wx-stat-value">
                  {Math.round(data.main.temp_max)}° / {Math.round(data.main.temp_min)}°
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Weather;