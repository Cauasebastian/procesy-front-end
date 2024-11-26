import React, { useState } from "react";
import Input from "../components/Form/Input";
import Button from "../components/Button";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login:", username, password);
    // Lógica de autenticação
  };

  return (
    <div className="login-container">
      <h1>Procesy</h1>
      <Input
        label="Usuário"
        placeholder="Digite seu usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Entrar" onClick={handleLogin} />
      <p className="register-link">
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  );
}

export default Login;