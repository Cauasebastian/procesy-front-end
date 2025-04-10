
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcoGoogle from "../../assets/ico-google.svg";
import LogoMaior from '../../assets/logo-maior.png';
import logo from "../../assets/logo.png";
import * as S from './styles';
import axios from "axios";
import { api } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const navigate = useNavigate();


  const handleCadastro = async (e) => {
    e.preventDefault()
  try {
    const response = await api.post(`/auth/register`, {
      nome,
      email,
      senha,
    });

    console.log(response.data);
    toast.success("Cadastro realizado com sucesso! Faça login com sua senha.");
    setTimeout(() => {
        navigate("/");
      }, 3000); 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Erro desconhecido no servidor.";
      toast.error(`Erro no cadastro: ${message}`);
    } else {
      toast.error("Erro inesperado. Tente novamente.");
    }
    toast.error("Erro no cadastro:", error);
  }
};
  return (
 <S.ContainerGeral>
      {/* Esquerda - Login */}
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                type="password"
                value={senha}
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
            type="submit"
          >
            Cadastrar
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
