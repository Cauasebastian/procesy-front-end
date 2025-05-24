import React, { useState } from "react";
import * as S from "./styles";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import ButtonBack from '../../assets/btn-back.svg'
import { IoChevronDownOutline } from 'react-icons/io5';


function NovoProcesso() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isNovoCliente, setIsNovoCliente] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleOpenDialog = async () => {
    setOpenDialog(true);
    await fetchClientes();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
    setOpenDialog(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Autenticação necessária!");
        navigate("/");
        return;
      }

      const response = await axios.get("/advogado/clientes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      const clientesFiltrados = data.filter((item) => typeof item === "object" && item !== null);
      setClientes(clientesFiltrados);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
      setError("Erro ao buscar clientes. Tente novamente.");
      alert("Erro ao buscar clientes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <S.Container>
        <S.VoltarContainer onClick={handleBackClick}>
          <S.ImageArrow src={ButtonBack}/>
          <S.VoltarTexto>Novo Processo</S.VoltarTexto>
        </S.VoltarContainer>

        <S.FormWrapper>
          <div>
            <S.Titulo>Selecione o cliente</S.Titulo>
            <S.Subtitulo>Selecione o Cliente</S.Subtitulo>

            <S.BotaoSelecionar onClick={handleOpenDialog} disabled={isNovoCliente}>
              {selectedCliente ? (
                <div>
                  <strong>{selectedCliente.nome}</strong>
                </div>
              ) : (
                "Escolher Cliente"
              )}
              <IoChevronDownOutline size={24} />
            </S.BotaoSelecionar>

            {openDialog && (
              <S.DialogOverlay>
                <S.DialogBox>
                  <strong>Escolha um Cliente</strong>
                  <button onClick={handleCloseDialog}>Fechar</button>

                  {loading ? (
                    <S.LoadingContainer>Carregando...</S.LoadingContainer>
                  ) : error ? (
                    <S.ErroTexto>{error}</S.ErroTexto>
                  ) : clientes.length === 0 ? (
                    <p>Nenhum cliente encontrado.</p>
                  ) : (
                    <S.ListaClientes>
                      {clientes.map((cliente) => (
                        <S.ItemCliente key={cliente.id} onClick={() => handleSelectCliente(cliente)}>
                          <p><strong>{cliente.nome}</strong></p>
                          <p>Email: {cliente.email}</p>
                          <p>Telefone: {cliente.telefone}</p>
                          <p>Processos: {cliente.processos ? cliente.processos.length : 0}</p>
                        </S.ItemCliente>
                      ))}
                    </S.ListaClientes>
                  )}
                </S.DialogBox>
              </S.DialogOverlay>
            )}

            <S.CheckboxContainer>
              <input
                type="checkbox"
                checked={isNovoCliente}
                onChange={(e) => {
                  setIsNovoCliente(e.target.checked);
                  if (e.target.checked) setSelectedCliente(null);
                }}
              />
              <label>Novo cliente</label>
            </S.CheckboxContainer>
          </div>

          <S.BotaoProximo
            onClick={() => {
              if (isNovoCliente) {
                navigate("/cadastro-informacoes");
              } else if (selectedCliente) {
                navigate("/cadastro-informacoes", { state: { cliente: selectedCliente } });
              }
            }}
            disabled={!selectedCliente && !isNovoCliente}
          >
            Próximo
          </S.BotaoProximo>
        </S.FormWrapper>
      </S.Container>
    </>
  );
}

export default NovoProcesso;
