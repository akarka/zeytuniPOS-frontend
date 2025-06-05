function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  width = "w-full",
  inputClassName = "",
}) {
  return (
    <div className={`form-control ${width}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input input-bordered input-sm ${inputClassName}`}
      />
    </div>
  );
}

export default InputField;
