import React from "react";
import "./Tabs.css";

function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
