import { Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie"; // Para salvar o token no cookie
import IcoGoogle from "../../assets/ico-google.svg";
import LogoMaior from '../../assets/logo-maior.png';
import logo from "../../assets/logo.png";
import * as S from './styles';
import { api } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();






const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/auth/login', {
      email,
      senha
    });

    const data = response.data;
    console.log(data);

        if (data?.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/menu");
      }, 3000); 
    }
 else {
      throw new Error("Token não encontrado na resposta");
    }

  } catch (error) {
    console.error("Erro no login:", error);
    toast.error("Erro ao realizar login. Verifique suas credenciais.");
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
                type="password"
                value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
            type="submit"
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
