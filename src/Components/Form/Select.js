import React from "react";
import "./Select.css";

function Select({ label, options, value, onChange }) {
  return (
    <div className="select-container">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
