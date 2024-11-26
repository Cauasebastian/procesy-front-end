// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NovoCliente from "./pages/NovoCliente";
import NovoProcesso from "./pages/NovoProcesso";
import Processos from "./pages/Processos";
import ClienteInformacoes from "./pages/ClienteInformacoes";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/novo-cliente" element={<NovoCliente />} />
            <Route path="/novo-processo" element={<NovoProcesso />} />
            <Route path="/processos" element={<Processos />} />
            <Route path="/cliente-informacoes" element={<ClienteInformacoes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
