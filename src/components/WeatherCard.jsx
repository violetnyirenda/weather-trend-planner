import Card from "./ui/Card";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <Card title="Current Weather" subtitle={`${weather.cityName}, ${weather.country}`} className="card">
      <div className="weather-grid">
        <p>
          <span className="label">Temperature</span>
          <span className="value">{weather.temp} C</span>
        </p>
        <p>
          <span className="label">Condition</span>
          <span className="value condition">{weather.condition}</span>
        </p>
        <p>
          <span className="label">Humidity</span>
          <span className="value">{weather.humidity}%</span>
        </p>
        <p>
          <span className="label">Wind Speed</span>
          <span className="value">{weather.windSpeed} m/s</span>
        </p>
      </div>
    </Card>
  );
}