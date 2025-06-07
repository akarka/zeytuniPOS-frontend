import { useState } from 'react';

function SatirForm({ initialData, fields, onCancel, onSubmit }) {
  const [form, setForm] = useState(initialData);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <tr>
      <td colSpan={fields.length + 1}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: '10px' }}
        >
          {fields.map((field) => {
            if (field.type === 'select') {
              return (
                <select
                  key={field.name}
                  value={form[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              );
            } else {
              return (
                <input
                  key={field.name}
                  type={field.type || 'text'}
                  value={form[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                />
              );
            }
          })}
          <button type="submit">Kaydet</button>
          <button
            type="button"
            onClick={onCancel}
          >
            İptal
          </button>
        </form>
      </td>
    </tr>
  );
}

export default SatirForm;
