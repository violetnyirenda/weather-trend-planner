export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="card">
      <h2>{weather.cityName}</h2>
      <div className="weather-grid">
        <p>
          <span className="label">Temperature</span>
          <span className="value">{weather.temp} C</span>
        </p>
        <p>
          <span className="label">Condition</span>
          <span className="value condition">{weather.condition}</span>
        </p>
      </div>
    </div>
  );
}