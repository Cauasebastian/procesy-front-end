import styled from "styled-components";

export const ContainerGeral = styled.div`
  padding: 0 4rem;
  width: 100%;
  margin-top: 3rem;
  overflow-x: hidden;
  
`

export const ContainerGoBack = styled.div`
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`

export const ImageArrow = styled.img``
export const TextBack = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
`

export const ContainerChatBot = styled.div`
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

export const HeaderContainerMessage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const IconMessage = styled.img`

`

export const TextHeader = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`

export const ContainerMessages = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  min-height: 30rem;
  padding-bottom: 6rem; // evita sobreposição com o input fixo
`;


export const FieldMessageContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.7rem;
  position: absolute; 
  bottom: 2rem; 
  left: 0;
  padding: 0 3rem;
`;


export const InputMessage = styled.input`
 width: 95%;
 border: none;
 background-color:rgb(231, 230, 230);
 padding: 1rem;
 border-radius: 15px;
 display: flex;
 justify-content: center;
 align-items: center;
 font-family: 'Poppins', sans-serif;
 font-size: 1.2rem;
 outline: none;
`

export const ButtonSendMessage = styled.button`
  background-color: #014876;
  border-radius: 50%;
  outline: none;
  border: none;
  padding: 1.1rem;
`

export const ImgIcoSend = styled.img`
  
`
export const ContainerMessagesUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem ;
  height: 100%;
`

export const ContainerMessageSendedUser = styled.div`
  padding: 1rem;
  background-color: #014876;
  border-radius: 10px 10px 0 10px;
  width: fit-content;
  color: #fff;
  align-self: flex-end;
  max-width: 60%;
`;

export const ContainerMessageSendedBot = styled.div`
  padding: 1rem;
  background-color: #e6e6e6;
  border-radius: 10px 10px 10px 0;
  width: fit-content;
  color: #000;
  align-self: flex-start;
  max-width: 60%;
`;