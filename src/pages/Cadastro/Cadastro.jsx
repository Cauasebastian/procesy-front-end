
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import * as S from './styles'
import IcoGoogle from "../../assets/ico-google.svg"
import LogoMaior from '../../assets/logo-maior.png'

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL não está definido.");
}

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCadastro = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Download da chave privada
        const blob = new Blob([data.privateKey], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chave_privada.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert("Cadastro realizado com sucesso! Faça login com sua chave.");
        navigate("/");// Redireciona para a página de login
      } else {
        const errorData = await response.json();
        alert(`Erro no cadastro: ${errorData.message || "Verifique os dados."}`);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
 <S.ContainerGeral>
      {/* Esquerda - Login */}
      <S.ContainerInputs>
        <S.ImgLogo>
            <img src={logo} alt="Logo" />
        </S.ImgLogo>
        <S.TitleRegister>
          Get Started
        </S.TitleRegister>
        
        <S.RegisterForm>
          <S.WrapperInput>
            <S.LabelInput>Nome Completo</S.LabelInput>
              <S.InputForm
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
              />
          </S.WrapperInput>
          <S.WrapperInput>
            <S.LabelInput>Email</S.LabelInput>
              <S.InputForm
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
              />
          </S.WrapperInput>
          <S.WrapperInput>
            <S.LabelInput>Senha</S.LabelInput>
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
      
          <S.ButtonSignUp
            onClick={handleCadastro}
          >
            Entrar
          </S.ButtonSignUp>
          <S.DivisorForm></S.DivisorForm>
        </S.RegisterForm>
        <S.ButtonGoogle>
          <img src={IcoGoogle} alt="" />
          Or sign in with Google
        </S.ButtonGoogle>
        <S.ContainerTextHaveAlreadyAccount>
          <S.TextHaveAlreadyAccount>Já tem uma conta?</S.TextHaveAlreadyAccount>
          <S.LinkHaveAlreadyAccount to={'/'}>Entre</S.LinkHaveAlreadyAccount>
        </S.ContainerTextHaveAlreadyAccount>
      </S.ContainerInputs>

      {/* Direita - Logo */}
      <S.ContainerLogo>
          <S.LogoMaiorImage src={LogoMaior} alt="Logo" /> 
      </S.ContainerLogo>
    </S.ContainerGeral>
  );
}

export default Cadastro;
