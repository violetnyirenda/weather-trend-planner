import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Card from "./ui/Card";

export default function WeatherChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <Card title="Temperature Trend" subtitle="Monday to Sunday average forecast" className="chart-container">
      <div className="chart-inner">
        <div className="chart-legend">
          <span className="legend-dot" />
          <span>Average Temperature</span>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#d6dfef" />
            <XAxis dataKey="day" tickMargin={10} />
            <YAxis
              tickMargin={10}
              label={{ value: "Temperature (C)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip formatter={(value) => [`${value} C`, "Avg Temp"]} labelFormatter={(label, payload) => {
              const fullDate = payload?.[0]?.payload?.date;
              return fullDate ? `${label} (${fullDate})` : label;
            }} />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#2d5bff"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2d5bff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}