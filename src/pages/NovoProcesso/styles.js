import styled from "styled-components";

export const Container = styled.div`
  padding: 0 4rem;
  width: 100%;
  margin-top: 3rem;
  overflow-y: hidden;
`;

export const VoltarContainer = styled.div`
 display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

export const ImageArrow = styled.img``


export const VoltarTexto = styled.span`
   font-weight: 600;
  font-size: 1.2rem;
`;

export const FormWrapper = styled.div`
    position: relative; 
  width: 100%;
  padding: 3rem;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 3rem;
  border-radius: 6px;
  min-height: 40rem; 
  margin-bottom: 6rem;
`;

export const Titulo = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
`;

export const Subtitulo = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const BotaoSelecionar = styled.button`
  padding: 10px;
  background-color: #454b60;
  max-width: 30rem;
  width: 30rem;
  color: white;
  border: none;
  border-radius: 4px;
  text-align: left;
  margin-bottom: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const DialogBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

export const ListaClientes = styled.div`
  margin-top: 16px;
  max-height: 300px;
  overflow-y: auto;
`;

export const ItemCliente = styled.div`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const CheckboxContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
  }
`;

export const BotaoProximo = styled.button`
  width: 10rem;
  position: absolute;
  bottom: 5%;
  right: 3%;
  padding: 10px;
  background-color: #454b60;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

export const ErroTexto = styled.p`
  color: red;
  margin-top: 8px;
`;
