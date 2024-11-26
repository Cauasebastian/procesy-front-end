// import React from "react";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import Button from "../components/Button";
import "./NovoProcesso.css";

function NovoProcesso() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Processo cadastrado com sucesso!");
  };

  return (
    <div className="novo-processo">
      <h1>Cadastro de Novo Processo</h1>
      <form onSubmit={handleSubmit}>
        <Select
          label="Cliente"
          options={["João Carlos", "Maria Silva", "Ana Souza"]}
        />
        <Input label="Número do Processo" placeholder="Digite o número" />
        <Input label="Data de Início" type="date" />
        <Input label="Descrição" placeholder="Digite a descrição" />
        <Button type="submit">Cadastrar Processo</Button>
      </form>
    </div>
  );
}

export default NovoProcesso;
