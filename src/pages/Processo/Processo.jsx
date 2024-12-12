import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PageBack } from "../../components/PageBack";
import { Box, Typography, Card, CardContent, Button, Divider, List, ListItem, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Processo() {
  const location = useLocation();
  const { processo } = location.state || {}; // Desestruturação com fallback

  // Estados para armazenar os arquivos carregados
  const [uploadedFilesPessoais, setUploadedFilesPessoais] = useState([]);
  const [uploadedFilesTerceiros, setUploadedFilesTerceiros] = useState([]);

  const handleFileUpload = (type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf, .docx, .jpg, .png"; // Tipos de arquivo permitidos
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileDetails = {
          id: Date.now(), // ID único para cada arquivo
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
        };
        if (type === "pessoais") {
          setUploadedFilesPessoais((prev) => [...prev, fileDetails]);
        } else if (type === "terceiros") {
          setUploadedFilesTerceiros((prev) => [...prev, fileDetails]);
        }
      }
    };
    input.click();
  };

  const handleFileRemove = (type, fileId) => {
    if (type === "pessoais") {
      setUploadedFilesPessoais((prev) => prev.filter((file) => file.id !== fileId));
    } else if (type === "terceiros") {
      setUploadedFilesTerceiros((prev) => prev.filter((file) => file.id !== fileId));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        background: "#f4f4f4", // Fundo cinza neutro
        paddingTop: "30px",
        paddingX: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Cabeçalho com o título e o botão de voltar */}
        <PageBack
          title="Detalhes do Processo"
          sx={{
            color: "#000000", // Texto preto
            fontWeight: "bold",
          }}
        />

        {/* Detalhes do processo */}
        <Typography
          variant="h5"
          sx={{
            marginY: 2,
            fontWeight: "bold",
            color: "#000000", // Texto preto
            textAlign: "center",
          }}
        >
          Número: {processo?.numero || "Não especificado"}
        </Typography>

        <Divider sx={{ marginY: 3, borderColor: "#d3d3d3" }} />

        {/* Seção de Documentos Pessoais */}
        <Card
          sx={{
            width: "100%",
            backgroundColor: "#e0e0e0", // Fundo cinza claro
            borderRadius: 4,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: 3,
            marginBottom: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#000000", // Texto preto
                marginBottom: 2,
              }}
            >
              Documentos Pessoais
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleFileUpload("pessoais")}
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#4a90e2", // Azul estilizado
                color: "#ffffff", // Texto branco
                textTransform: "none",
                fontWeight: "bold",
                paddingY: 1,
                paddingX: 3,
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "#357ABD", // Azul mais escuro no hover
                },
              }}
            >
              Escolher arquivo
            </Button>
            <List>
              {uploadedFilesPessoais.map((file) => (
                <ListItem
                  key={file.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#000000",
                  }}
                >
                  {file.name} ({file.size})
                  <IconButton
                    color="error"
                    onClick={() => handleFileRemove("pessoais", file.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Seção de Documentos de Terceiros */}
        <Card
          sx={{
            width: "100%",
            backgroundColor: "#e0e0e0", // Fundo cinza claro
            borderRadius: 4,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: 3,
            marginBottom: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#000000", // Texto preto
                marginBottom: 2,
              }}
            >
              Documentos de Terceiros
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleFileUpload("terceiros")}
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#4a90e2", // Azul estilizado
                color: "#ffffff", // Texto branco
                textTransform: "none",
                fontWeight: "bold",
                paddingY: 1,
                paddingX: 3,
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "#357ABD", // Azul mais escuro no hover
                },
              }}
            >
              Escolher arquivo
            </Button>
            <List>
              {uploadedFilesTerceiros.map((file) => (
                <ListItem
                  key={file.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#000000",
                  }}
                >
                  {file.name} ({file.size})
                  <IconButton
                    color="error"
                    onClick={() => handleFileRemove("terceiros", file.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Seção de Processos Relacionados */}
        <Card
          sx={{
            width: "100%",
            backgroundColor: "#e0e0e0", // Fundo cinza claro
            borderRadius: 4,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: 3,
            marginBottom: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#000000", // Texto preto
                marginBottom: 2,
              }}
            >
              Processos Relacionados
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#000000", // Texto preto
                  marginBottom: 1,
                }}
              >
                Situação do processo
              </Typography>
              <Typography variant="body2" sx={{ color: "#000000" }}>
                Em andamento
              </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#000000", // Texto preto
                  marginBottom: 1,
                }}
              >
                Ação
              </Typography>
              <Typography variant="body2" sx={{ color: "#000000" }}>
                Usucapião
              </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#000000", // Texto preto
                  marginBottom: 1,
                }}
              >
                Número do processo
              </Typography>
              <Typography variant="body2" sx={{ color: "#000000" }}>
                {processo?.numero || "Não especificado"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
