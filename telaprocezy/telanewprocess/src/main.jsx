import React from "react";
import ReactDOM from "react-dom/client";
import NovoProcesso from "./App"; // Importe o componente do App.jsx
import "./index.css"; // Estilos globais

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NovoProcesso />
  </React.StrictMode>
);
