// Estilização para o seletor de datas (caso não esteja usando uma biblioteca como react-datepicker)
import React from "react";
import "./DatePicker.css";

function DatePicker({ label, value, onChange }) {
  return (
    <div className="datepicker-container">
      <label>{label}</label>
      <input type="date" value={value} onChange={onChange} />
    </div>
  );
}

export default DatePicker;
