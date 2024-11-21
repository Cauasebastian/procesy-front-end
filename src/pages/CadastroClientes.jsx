import React from 'react'

function CadastroClientes() {
  return (
    <div>
      <h1>Cadastro de Clientes</h1>
      <form>
        <label>
          Nome do Cliente:
          <input type="text" name="nomeCliente" />
        </label>
        <br />
        <label>
          Endereço:
          <input type="text" name="endereco" />
        </label>
        <br />
        <label>
          Telefone:
          <input type="tel" name="telefone" />
        </label>
        <br />
        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  )
}

export default CadastroClientes
