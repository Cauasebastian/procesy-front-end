import React from "react";
import "./thales.css";

function NovoProcesso() {
  return (
    <div className="container">
      <header className="header">
        <button className="menu-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29343.png" 
          alt="Logo"
          className="logo"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
          alt="User"
          className="profile-pic"
        />
      </header>

      <div className="divider"></div>  {/* Linha de separação */}

      <main className="main">
        <div className="title-container">
          <button className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="title">Novo Processo</h1>
        </div>
        <p className="subtitle">Selecione o Cliente</p>

        <div className="form-group">
          <div className="dropdown-wrapper">
            <select className="dropdown filled-dropdown">
              <option>Escolher Cliente</option>
            </select>
            <div className="dropdown-arrow"></div>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="novoCliente"
            className="checkbox"
          />
          <label htmlFor="novoCliente" className="checkbox-label">
            Novo cliente
          </label>
        </div>
      </main>

      <footer className="footer">
        <button className="next-button">Próximo</button>
      </footer>
    </div>
  );
}

export default NovoProcesso;
