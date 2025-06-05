function SelectField({
  label,
  value,
  onChange,
  options = [],
  className = "",
  width = "w-full",
}) {
  return (
    <div className={`form-control ${width}`}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`select select-bordered select-sm ${className}`}
      >
        <option value="">Seçiniz</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
