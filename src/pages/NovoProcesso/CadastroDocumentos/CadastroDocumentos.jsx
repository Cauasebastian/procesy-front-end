import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  IconButton,
} from '@mui/material';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import {Header} from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosConfig'; // Utilize a instância configurada do axios




function CadastroDocumentos() {
    const [clienteDocs, setClienteDocs] = useState({
      cpf: null,
      rh: null,
    });
    const [terceirosDocs, setTerceirosDocs] = useState({
      cpf: null,
      rh: null,
    });

    const navigate = useNavigate();

function handleProcessoClick() {
    navigate("/novo-processo");
    }

  


  return (
    <>
    <Header />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw',
              minHeight: '100vh',
              background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
              padding: 2,
            }}
          >
            <Box
              sx={{
                width: '90%',
                maxWidth: '800px',
                backgroundColor: '#fff',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
        {/* Header */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
          Cadastro do Cliente
        </Typography>

        {/* Abas - Simulação */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
          <Button variant="text" sx={{ fontWeight: 'bold', color: '#555' }}
          onClick={() => {
            navigate("/cadastro-clientes")
          }}
          >
            Dados Pessoais
          </Button>
          <Button variant="text" sx={{ fontWeight: 'bold', color: '#555',  borderBottom: '2px solid #3F4E7A' }}>
            Documentos
          </Button>
          <Button variant="text" sx={{ fontWeight: 'bold', color: '#3F4E7A'}} 
          onClick={() => {
                navigate("/cadastro-processos")
              }}
              >
            Processo
          </Button>
        </Box>

        {/* Dados do Processo */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Documentos do Cliente
        </Typography>
        <Grid container spacing={2}>
          {["cpf", "rh"].map((doc, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={doc.toUpperCase()}
                value={clienteDocs[doc] || ""}
                InputProps={{
                  endAdornment: (
                    <IconButton component="label">
                      <UploadFileOutlinedIcon />
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleFileUpload(e, doc, setClienteDocs, clienteDocs)
                        }
                      />
                    </IconButton>
                  ),
                }}
                placeholder="Selecione um arquivo..."
                disabled
                margin="normal"
              />
            </Grid>
          ))}
        </Grid>

        {/* Documentos de Terceiros */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mt: 4, mb: 2 }}
        >
          Documentos de Terceiros
        </Typography>
        <Grid container spacing={2}>
          {["cpf", "rh"].map((doc, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={doc.toUpperCase()}
                value={terceirosDocs[doc] || ""}
                InputProps={{
                  endAdornment: (
                    <IconButton component="label">
                      <UploadFileOutlinedIcon />
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleFileUpload(e, doc, setTerceirosDocs, terceirosDocs)
                        }
                      />
                    </IconButton>
                  ),
                }}
                placeholder="Carregar documento..."
                disabled
                margin="normal"
              />
            </Grid>
          ))}
        </Grid>

        {/* Botão Final */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: "#3F4E7A",
            ":hover": { backgroundColor: "#2F3C5E" },
            fontWeight: "bold",
            borderRadius: 8,
            padding: "10px",
          }}
          onClick={() => {
            navigate("/cadastro-processos")
          }}
        >
          Próximo
        </Button>
      </Box>
    </Box>
    </>
  );
}

export default CadastroDocumentos;