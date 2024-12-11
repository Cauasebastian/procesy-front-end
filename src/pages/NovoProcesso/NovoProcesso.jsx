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
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // Ícone de seta
import { Header } from "../../components/Header/index";
import { useNavigate } from "react-router-dom";

function NovoProcesso() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [isNovoCliente, setIsNovoCliente] = useState(false);

  const clientes = ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4"];

  const navigate = useNavigate();
  

  const handleOpenDialog = () => {
    setOpenDialog(true);
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
    // menu
    navigate("/menu"); // Aqui você pode redirecionar para outra página, caso necessário
    // Aqui você pode redirecionar para outra página, caso necessário
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
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Novo Processo
            </h1>

            {/* Subtítulo */}
            <p
              style={{
                marginBottom: "16px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Selecione o Cliente
            </p>

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
              {selectedCliente || "Escolher Cliente"}
            </Button>

            {/* Dialog de Seleção de Clientes */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
              <DialogTitle style={{ fontWeight: "bold" }}>
                Escolha um Cliente
              </DialogTitle>
              <DialogContent>
                <List>
                  {clientes.map((cliente, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => handleSelectCliente(cliente)}
                      >
                        <ListItemText primary={cliente} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
            </Dialog>

            {/* Checkbox Novo Cliente */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={isNovoCliente}
                  onChange={(e) => setIsNovoCliente(e.target.checked)}
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
              navigate("/cadastro-clientes")
            }}
          >
            Próximo
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default NovoProcesso;
