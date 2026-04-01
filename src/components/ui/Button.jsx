export default function Button({ children, className = "", ...props }) {
  return (
    <button className={`ui-button ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
