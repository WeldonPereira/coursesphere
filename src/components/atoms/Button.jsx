export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 ${className}`}
    >
      {children}
    </button>
  );
}
