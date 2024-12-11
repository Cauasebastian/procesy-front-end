import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // Ícone de seta
import { Header } from "../../components/Header/index";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa o axios

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
    console.log("Voltar para o formulário inicial");
    navigate("/menu"); // Redireciona para a página de menu
  };

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Autenticação necessária!");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:8080/advogado/clientes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Filtrar somente objetos (ignorar números)
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

      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "80px", // Margin superior para acomodar o header
          position: "relative",
        }}
      >
        {/* Botão Voltar */}
        <Box
          sx={{
            position: "absolute",
            top: "20px", // Distância do topo
            left: "20px", // Distância da lateral esquerda
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleBackClick}
        >
          <IconButton>
            <ArrowBack sx={{ color: "black", fontSize: "24px" }} />
          </IconButton>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "medium",
              color: "black",
              marginLeft: "8px",
            }}
          >
            Formulário inicial
          </Typography>
        </Box>

        {/* Box centralizado */}
        <Box
          sx={{
            width: "40%", // Ocupa 40% da largura da tela
            minWidth: "300px", // Garantir responsividade para telas menores
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Empurra o botão para o final
            height: "90%", // Box mais alto para ocupar mais espaço vertical
          }}
        >
          {/* Conteúdo superior */}
          <div>
            {/* Título */}
            <Typography
              variant="h5"
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Novo Processo
            </Typography>

            {/* Subtítulo */}
            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: "16px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Selecione o Cliente
            </Typography>

            {/* Botão de Selecionar Cliente */}
            <Button
              variant="outlined"
              onClick={handleOpenDialog}
              fullWidth
              sx={{
                justifyContent: "space-between",
                textTransform: "none",
                padding: "10px",
                marginBottom: "16px",
                backgroundColor: "#454B60",
                color: "#fff",
              }}
              disabled={isNovoCliente}
            >
              {selectedCliente ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Typography variant="body1">{selectedCliente.nome}</Typography>
                </Box>
              ) : (
                "Escolher Cliente"
              )}
            </Button>

            {/* Dialog de Seleção de Clientes */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
              <DialogTitle style={{ fontWeight: "bold" }}>Escolha um Cliente</DialogTitle>
              <DialogContent>
                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <CircularProgress />
                  </Box>
                ) : error ? (
                  <Typography color="error">{error}</Typography>
                ) : clientes.length === 0 ? (
                  <Typography>Nenhum cliente encontrado.</Typography>
                ) : (
                  <List>
                    {clientes.map((cliente) => (
                      <ListItem key={cliente.id} disablePadding>
                        <ListItemButton onClick={() => handleSelectCliente(cliente)}>
                          <ListItemText
                            primary={cliente.nome}
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  Email: {cliente.email}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2" color="text.primary">
                                  Telefone: {cliente.telefone}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2" color="text.primary">
                                  Processos: {cliente.processos ? cliente.processos.length : 0}
                                </Typography>
                              </>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </DialogContent>
            </Dialog>

            {/* Checkbox Novo Cliente */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={isNovoCliente}
                  onChange={(e) => {
                    setIsNovoCliente(e.target.checked);
                    if (e.target.checked) {
                      setSelectedCliente(null); // Limpa seleção se optar por novo cliente
                    }
                  }}
                />
              }
              label="Novo cliente"
            />
          </div>

          {/* Botão Próximo */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#454B60",
              ":hover": { backgroundColor: "#454B60" },
              fontWeight: "bold",
              borderRadius: 8,
              padding: "10px",
              marginTop: "16px", // Distância do botão ao conteúdo acima
            }}
            onClick={() => {
              if (isNovoCliente) {
                navigate("/cadastro-clientes");
              } else if (selectedCliente) {
                navigate("/cadastro-clientes", { state: { cliente: selectedCliente } });
              }
            }}
            disabled={!selectedCliente && !isNovoCliente}
          >
            Próximo
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default NovoProcesso;
