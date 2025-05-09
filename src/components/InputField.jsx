function InputField({ label, type = "text", value, onChange, placeholder }) {
    return (
      <div>
        <label>{label}</label><br />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
  
  export default InputField;
  