function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label>{label}</label>
      <br />
      <select value={value} onChange={onChange}>
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
