// import React from "react";
import Input from "../components/Form/Input";
import Button from "../Components/Button/Button";
import "./NovoCliente.css";

function NovoCliente() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Cliente cadastrado com sucesso!");
  };

  return (
    <div className="novo-cliente">
      <h1>Cadastro de Novo Cliente</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nome Completo" placeholder="Digite o nome completo" />
        <Input label="CPF" placeholder="Digite o CPF" />
        <Input label="Data de Nascimento" type="date" />
        <Input label="Telefone" placeholder="Digite o telefone" />
        <Input label="Email" type="email" placeholder="Digite o email" />
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}

export default NovoCliente;
