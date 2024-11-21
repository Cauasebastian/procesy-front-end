import React from 'react'

function CadastroProcessos() {
  return (
    <div>
      <h1>Cadastro de Processos</h1>
      <form>
        <label>
          Número do Processo:
          <input type="text" name="numeroProcesso" />
        </label>
        <br />
        <label>
          Cliente:
          <input type="text" name="cliente" />
        </label>
        <br />
        <label>
          Descrição:
          <textarea name="descricao"></textarea>
        </label>
        <br />
        <button type="submit">Cadastrar Processo</button>
      </form>
    </div>
  )
}

export default CadastroProcessos
