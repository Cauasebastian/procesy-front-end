import axios from "axios";

export const enviarMensagemParaIA = async (mensagem) => {
  const token = localStorage.getItem("token"); // ou onde você guarda seu JWT

  if (!token) throw new Error("Token não encontrado");

  const response = await axios.post(
    "http://localhost:8080/api/assistant/chat", // ou sua URL deployada
    mensagem,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};