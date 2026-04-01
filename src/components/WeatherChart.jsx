import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function WeatherChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Temperature Trend (Next 5-7 Days)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c9d6ea" />
          <XAxis dataKey="day" />
          <YAxis
            label={{ value: "Temperature (C)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip formatter={(value) => [`${value} C`, "Avg Temp"]} labelFormatter={(label, payload) => {
            const fullDate = payload?.[0]?.payload?.date;
            return fullDate ? `${label} (${fullDate})` : label;
          }} />

          <Line type="monotone" dataKey="temp" stroke="#1f5eea" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}