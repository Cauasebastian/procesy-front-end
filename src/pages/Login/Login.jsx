import { Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcoGoogle from "../../assets/ico-google.svg";
import LogoMaior from '../../assets/logo-maior.png';
import logo from "../../assets/logo.png";
import * as S from './styles';
import { api } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [privateKey, setPrivateKey] = useState(""); // Estado para a chave privada
  const navigate = useNavigate();

  // Função para lidar com o upload da chave privada
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPrivateKey(e.target.result);
        toast.success("Chave privada carregada com sucesso!");
      };
      reader.readAsText(file);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Verificar se a chave privada foi carregada
    if (!privateKey) {
      toast.error("Por favor, carregue sua chave privada!");
      return;
    }

    // Verificar se os campos estão preenchidos
    if (!email || !senha) {
      toast.error("Preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email,
        senha
      });

      const data = response.data;
      console.log(data);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("privateKey", privateKey); // Armazena a chave privada
        
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
      
      // Mensagem de erro mais específica
      const errorMessage = error.response?.data?.message || 
                           "Erro ao realizar login. Verifique suas credenciais.";
      
      toast.error(errorMessage);
    }
  };

  return (
    <S.ContainerGeral>
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
        
        <S.LoginForm onSubmit={handleLogin}>
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
          
          {/* Campo para upload da chave privada */}
          <S.WrapperInput>
            <S.LabelInput>Chave Privada</S.LabelInput>
              <S.InputForm
                type="file"
                onChange={handleFileChange}
                accept=".txt,.pem,.key" // Tipos de arquivo aceitos
              />
              {privateKey && (
                <S.KeyUploadSuccess>
                  ✓ Chave privada carregada
                </S.KeyUploadSuccess>
              )}
          </S.WrapperInput>
      
          <S.TextForgotPassword>
            <Link href="#" underline="hover">
              Esqueceu a senha?
            </Link>
          </S.TextForgotPassword>
          <S.ButtonSignIn
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

      <S.ContainerLogo>
          <S.LogoMaiorImage src={LogoMaior} alt="Logo" /> 
      </S.ContainerLogo>
    </S.ContainerGeral>
  );
}

export default Login;