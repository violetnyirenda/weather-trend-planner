import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherChart from "./components/WeatherChart";
import Insight from "./components/Insight";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getWeekdayLabel(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function processForecast(data) {
  const dayBuckets = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    const day = getWeekdayLabel(date);

    if (!dayBuckets[day]) {
      dayBuckets[day] = {
        temps: [],
        maxPop: 0,
        sampleDate: date,
      };
    }

    dayBuckets[day].temps.push(item.main.temp);
    dayBuckets[day].maxPop = Math.max(dayBuckets[day].maxPop, item.pop ?? 0);

    if (date < dayBuckets[day].sampleDate) {
      dayBuckets[day].sampleDate = date;
    }
  });

  const knownDailyTemps = Object.values(dayBuckets).map((bucket) => {
    const avgTemp = bucket.temps.reduce((a, b) => a + b, 0) / bucket.temps.length;
    return avgTemp;
  });

  const fallbackTemp =
    knownDailyTemps.length > 0
      ? knownDailyTemps.reduce((sum, value) => sum + value, 0) / knownDailyTemps.length
      : null;

  return WEEK_DAYS.map((day) => {
    const bucket = dayBuckets[day];

    if (!bucket) {
      return {
        day,
        date: "N/A",
        temp: fallbackTemp !== null ? Number(fallbackTemp.toFixed(1)) : null,
        rainProbability: 0,
      };
    }

    const avgTemp = bucket.temps.reduce((a, b) => a + b, 0) / bucket.temps.length;

    return {
      day,
      date: bucket.sampleDate,
      temp: Number(avgTemp.toFixed(1)),
      rainProbability: Math.round(bucket.maxPop * 100),
    };
  });
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      setChartData([]);
      return;
    }

    if (!API_KEY) {
      setError("Missing API key. Add VITE_WEATHER_API_KEY in your environment.");
      setWeather(null);
      setChartData([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== "200") {
        throw new Error(data.message || "City not found");
      }

      setWeather({
        cityName: data.city.name,
        temp: Number(data.list[0].main.temp.toFixed(1)),
        condition: data.list[0].weather[0].description,
      });
      setChartData(processForecast(data));
    } catch (err) {
      setWeather(null);
      setChartData([]);
      setError(err.message || "Error fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Forecast Intelligence</p>
        <h1>Weather Trend Planner</h1>
        <p className="subtitle">Plan outdoor activities with clearer 5-7 day trend insights.</p>
      </section>

      <SearchBar onSearch={fetchWeather} />

      {loading && <p className="status">Loading forecast...</p>}
      {error && <p className="error">{error}</p>}

      <WeatherCard weather={weather} />

      <WeatherChart data={chartData} />

      <Insight data={chartData} />
    </main>
  );
}