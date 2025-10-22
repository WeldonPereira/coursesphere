export default function Input({
  label,
  name,
  register,
  errors,
  type = "text",
  ...rest
}) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        type={type}
        {...(register ? register(name) : {})}
        className="w-full border p-2 rounded shadow-sm focus:outline-none focus:ring"
        {...rest}
      />
      {errors && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
    </div>
  );
}
