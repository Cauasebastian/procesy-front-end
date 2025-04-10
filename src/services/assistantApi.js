import { api } from "../lib/axios";

export const enviarMensagemParaIA = async (mensagem) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Token não encontrado");

  const response = await api.post(
    "/api/assistant/chat", // ou sua URL deployada
    mensagem,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data)
  return response.data;
};