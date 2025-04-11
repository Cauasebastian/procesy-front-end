import { Header } from "../../components/Header";
import * as S from './styles'
import ButtonBack from '../../assets/btn-back.svg'
import IcoChat from '../../assets/ico-chat.svg'
import { useNavigate } from "react-router-dom";
import IcoSend from '../../assets/ico-send.svg'
import { useState } from "react";
import { enviarMensagemParaIA } from "../../services/assistantApi";


export default function ChatBotPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

const handleSendMessage = async () => {
  if (message.trim() === "") return;

  const userMessage = { text: message, sender: "user" };
  setMessages((prev) => [...prev, userMessage]);
  setMessage("");

  try {
    const resposta = await enviarMensagemParaIA(message);
    
    setMessages((prev) => [...prev, { text: resposta, sender: "bot" }]);
  } catch (error) {
    console.error(error);
    setMessages((prev) => [
      ...prev,
      { text: "Erro ao obter resposta da IA.", sender: "bot" },
    ]);
  }
};

  return (
    <>
      <Header />
      <S.ContainerGeral>
        <S.ContainerGoBack onClick={() => navigate(-1)}>
           <S.ImageArrow src={ButtonBack} />
           <S.TextBack>ChatBot IA</S.TextBack>
        </S.ContainerGoBack>
        <S.ContainerChatBot>
          <S.HeaderContainerMessage>
            <S.IconMessage src={IcoChat } />
            <S.TextHeader>ChatBot</S.TextHeader>
          </S.HeaderContainerMessage>
          <S.ContainerMessages>
            <S.ContainerMessagesUser>
              {messages.map((msg, index) =>
                msg.sender === "user" ? (
                  <S.ContainerMessageSendedUser key={index}>
                    {msg.text}
                  </S.ContainerMessageSendedUser>
                ) : (
                  <S.ContainerMessageSendedBot key={index}>
                    {msg.text}
                  </S.ContainerMessageSendedBot>
                )
              )}
            </S.ContainerMessagesUser>

            

            <S.FieldMessageContainer>
              <S.InputMessage
                placeholder="Digite sua mensagem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <S.ButtonSendMessage onClick={handleSendMessage}>
                <S.ImgIcoSend src={IcoSend} />
              </S.ButtonSendMessage>
            </S.FieldMessageContainer>
          </S.ContainerMessages>
       </S.ContainerChatBot>
      </S.ContainerGeral>
    </>
  )
}