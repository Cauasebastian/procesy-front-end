import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Usuário:
          <input type="text" name="usuario" />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" name="senha" />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  )
}

export default Login
