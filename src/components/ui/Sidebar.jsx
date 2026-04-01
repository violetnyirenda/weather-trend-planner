const shortcuts = [
  { label: "Overview", value: "Current + Trend" },
  { label: "Insights", value: "Activity Planning" },
  { label: "Data Source", value: "OpenWeather API" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">Dashboard</p>
      <h2 className="sidebar-title">Forecast Control Center</h2>
      <p className="sidebar-copy">
        Search any city to get current weather, upcoming trends, and outdoor activity guidance.
      </p>
      <ul className="sidebar-list">
        {shortcuts.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </aside>
  );
}
