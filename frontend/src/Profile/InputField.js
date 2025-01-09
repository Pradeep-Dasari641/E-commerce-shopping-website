import React, { useState } from 'react';

const InputField = ({ label, type = "text", value, readOnly, onChange, name }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => value === "" && setFocused(false)}
        className={readOnly ? "read-only" : ""}
        readOnly={readOnly}
        required
      />
      <label className={focused || value ? "active" : ""}>{label}</label>
    </div>
  );
};

export default InputField;
