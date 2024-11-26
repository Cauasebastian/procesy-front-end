import React from "react";
import "./Input.css";

function Input({ label, type = "text", placeholder, value, onChange, ...props }) {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Input;
