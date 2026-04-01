export default function Card({ title, subtitle, className = "", children }) {
  return (
    <section className={`ui-card ${className}`.trim()}>
      {(title || subtitle) && (
        <header className="ui-card-header">
          {title && <h3 className="ui-card-title">{title}</h3>}
          {subtitle && <p className="ui-card-subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="ui-card-body">{children}</div>
    </section>
  );
}
