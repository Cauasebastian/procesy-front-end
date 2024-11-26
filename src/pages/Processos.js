// import React from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import "./Processos.css";

function Processos() {
  const processos = [
    {
      numero: "124",
      cliente: "João Carlos",
      status: "Em andamento",
      acao: "Usucapião",
    },
    {
      numero: "125",
      cliente: "Maria Silva",
      status: "Concluído",
      acao: "Divórcio",
    },
  ];

  return (
    <div className="processos">
      <h1>Processos</h1>
      <Button onClick={() => alert("Novo Processo")}>Novo Processo</Button>
      <Table data={processos} />
    </div>
  );
}

export default Processos;
