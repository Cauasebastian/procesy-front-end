import React from "react";
import "./Card.css";

function Card({ title, value, icon }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default Card;
