import React from 'react'

function Cadastro() {
  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <label>
          Nome:
          <input type="text" name="nome" />
        </label>
        <br />
        <label>
          E-mail:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" name="senha" />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default Cadastro
