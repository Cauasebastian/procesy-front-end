import {Link} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie"; // Para salvar o token no cookie
import logo from "../../assets/logo.png";
import IcoGoogle from "../../assets/ico-google.svg"
import LogoMaior from '../../assets/logo-maior.png'
import * as S from './styles';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL não está definido.");
}

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPrivateKey(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleLogin = async () => {
    if (!privateKey) {
      alert("Por favor, carregue sua chave privada!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("privateKey", privateKey); // Armazena a chave
        console.log(data);
        
        navigate("/menu");
      } else {
        alert("Erro no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      console.log(response);
      alert("Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <S.ContainerGeral>
      {/* Esquerda - Login */}
      <S.ContainerInputs>
        <S.ImgLogo>
            <img src={logo} alt="Logo" />
        </S.ImgLogo>
        <S.TitleLogin>
          Nice to see you again
        </S.TitleLogin>
        
        <S.LoginForm>
          <S.WrapperInput>
            <S.LabelInput>Login</S.LabelInput>
              <S.InputForm
                value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ou telefone"
              />
          </S.WrapperInput>
          <S.WrapperInput>
            <S.LabelInput>Password</S.LabelInput>
              <S.InputForm
                type={showPassword ? "text" : "password"}
                value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              />
          </S.WrapperInput>
          {/* <S.WrapperInput>
            <S.LabelInput>Chave Privada</S.LabelInput>
              <S.InputForm
                type="file"
                onChange={handleFileChange}
              />
          </S.WrapperInput> */}
      
          <S.TextForgotPassword>
            <Link href="#" underline="hover">
              Esqueceu a senha?
            </Link>
          </S.TextForgotPassword>
          <S.ButtonSignIn
            onClick={handleLogin}
          >
            Entrar
          </S.ButtonSignIn>
          <S.DivisorForm></S.DivisorForm>
        </S.LoginForm>
        <S.ButtonGoogle>
          <img src={IcoGoogle} alt="" />
          Or sign in with Google
        </S.ButtonGoogle>
        <S.ContainerTextDontHaveAccount>
          <S.TextDontHaveAccount>Não tem uma conta?</S.TextDontHaveAccount>
          <S.LinkDontHaveAccount to={'/cadastro'}>Registre-se</S.LinkDontHaveAccount>
        </S.ContainerTextDontHaveAccount>
      </S.ContainerInputs>

      {/* Direita - Logo */}
      <S.ContainerLogo>
          <S.LogoMaiorImage src={LogoMaior} alt="Logo" /> 
      </S.ContainerLogo>
    </S.ContainerGeral>
  );
}

export default Login;
