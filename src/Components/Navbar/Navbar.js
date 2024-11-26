import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Procesy</h1>
      <ul className="navbar-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/novo-cliente">Novo Cliente</a></li>
        <li><a href="/novo-processo">Novo Processo</a></li>
        <li><a href="/processos">Processos</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
