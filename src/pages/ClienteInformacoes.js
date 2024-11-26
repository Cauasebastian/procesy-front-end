// import React from "react";
import Tabs from "../components/Form/Tabs";
import "./ClienteInformacoes.css";

function ClienteInformacoes() {
  const tabsContent = [
    { label: "Dados Pessoais", content: <div>Nome: João Carlos</div> },
    { label: "Documentos", content: <div>Documento: RG, CPF</div> },
    { label: "Processos", content: <div>Processo: Usucapião</div> },
  ];

  return (
    <div className="cliente-informacoes">
      <h1>Informações do Cliente</h1>
      <Tabs tabs={tabsContent} />
    </div>
  );
}

export default ClienteInformacoes;
