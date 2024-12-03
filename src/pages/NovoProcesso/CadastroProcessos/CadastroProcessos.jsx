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

function CadastroProcessos() {
  const [uploadedFiles, setUploadedFiles] = useState({
    contrato: null,
    procuracao: null,
    peticao: null,
    documentos: null,
  });

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    setUploadedFiles((prevFiles) => ({
      ...prevFiles,
      [docType]: file ? file.name : null,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
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
          <Button variant="text" sx={{ fontWeight: 'bold', color: '#555' }}>
            Dados Pessoais
          </Button>
          <Button variant="text" sx={{ fontWeight: 'bold', color: '#555' }}>
            Documentos
          </Button>
          <Button variant="text" sx={{ fontWeight: 'bold', color: '#3F4E7A', borderBottom: '2px solid #3F4E7A' }}>
            Processo
          </Button>
        </Box>

        {/* Dados do Processo */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Dados do Processo
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tipo de Processo"
              margin="normal"
              select
              defaultValue=""
            >
              <MenuItem value="Civil">Civil</MenuItem>
              <MenuItem value="Trabalhista">Trabalhista</MenuItem>
              <MenuItem value="Criminal">Criminal</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tipo de Atendimento"
              margin="normal"
              select
              defaultValue=""
            >
              <MenuItem value="Presencial">Presencial</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data de Início"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data de Atualização"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Status do Processo"
              margin="normal"
              select
              defaultValue="Em Andamento"
            >
              <MenuItem value="Em Andamento">Em Andamento</MenuItem>
              <MenuItem value="Concluído">Concluído</MenuItem>
              <MenuItem value="Pendente">Pendente</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número do Processo"
              margin="normal"
              placeholder="PRO.0010891"
            />
          </Grid>
        </Grid>

        {/* Documentos */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', mt: 4 }}>
          Carregar Documentos
        </Typography>
        <Grid container spacing={2}>
          {['Contrato', 'Procuração', 'Petição', 'Documentos'].map((doc, index) => {
            const key = doc.toLowerCase();
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Box>
                  <TextField
                    fullWidth
                    label={`Carregar ${doc}`}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleFileUpload(e, key)}
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles[key] || 'Nenhum arquivo selecionado'}
                    disabled
                  />
                  <TextField
                    fullWidth
                    label={`Status do ${doc}`}
                    margin="normal"
                    select
                    defaultValue="Em Andamento"
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Botão Final */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: '#3F4E7A',
            ':hover': { backgroundColor: '#2F3C5E' },
            fontWeight: 'bold',
            borderRadius: 8,
          }}
        >
          Criar Novo Processo
        </Button>
      </Box>
    </Box>
  );
}

export default CadastroProcessos;
