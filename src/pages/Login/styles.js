import { Link } from "react-router-dom";
import styled from "styled-components";


export const ContainerGeral = styled.div`
   width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
`

export const ContainerInputs = styled.div`
  width:40% ;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  align-items: center;
  padding: 0 5rem;
`

export const ImgLogo = styled.div`
  width: 100%;
`

export const TitleLogin = styled.p`
  color: #1A1A1A;
  width: 100%;
  font-weight: 600;
  font-size: 25px;
  font-family: 'Poppins', sans-serif;
`

export const LoginForm = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
 
 
`

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
export const LabelInput = styled.label`
  color: #333333;
  font-weight: 500;
`
export const InputForm = styled.input`
  background-color:rgb(216, 216, 216);
  border: none;
  outline: none;
  padding: 1.3rem;
  border-radius: 5px;
  font-size: 17px;
`

export const TextForgotPassword = styled.p`
  color: #007AFF;
`

export const ButtonSignIn = styled.button`
  background-color: #007AFF;
  color: #FFF;
  font-weight: 700;
  font-size: 17.5px;
  padding:1rem;
`

export const DivisorForm = styled.div`
  width: 100%;
  border-top: 1px solid #E5E5E5;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

export const ButtonGoogle = styled.button`
  display: flex;
  color: #FFF;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  gap: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
`

export const ContainerLogo = styled.div`
  background: linear-gradient(to bottom, #e3ecf2 0%, #b4d4e6 50%, #7cbfe4 100%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LogoMaiorImage = styled.img`
  width: 13.5rem;
  height: 17.3rem;
`

export const ContainerTextDontHaveAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

export const TextDontHaveAccount = styled.p`

`

export const LinkDontHaveAccount = styled(Link)`

`