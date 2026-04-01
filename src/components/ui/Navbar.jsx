export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand-mark" aria-hidden="true" />
      <div>
        <p className="navbar-kicker">Weather Operations</p>
        <h1 className="navbar-title">Weather Trend Planner</h1>
      </div>
      <div className="navbar-badge">Live Forecast</div>
    </header>
  );
}
