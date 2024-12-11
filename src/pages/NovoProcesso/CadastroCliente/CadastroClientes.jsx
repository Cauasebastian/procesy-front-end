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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { Header } from '../../../components/Header';
import { useNavigate } from 'react-router-dom';

function CadastroClientes() {
  const [clienteInfo, setClienteInfo] = useState({
    nome: '',
    genero: '',
    estadoCivil: '',
    cpf: '',
    cnpj: '',
    telefone: '',
    email: '',
  });

  const [clienteDocs, setClienteDocs] = useState({
    cpf: null,
    rh: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    setClienteDocs((prevDocs) => ({
      ...prevDocs,
      [docType]: file ? file.name : null,
    }));
  };

  return (
    <>
      <Header />
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '900vh',
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
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Cadastro do Cliente
          </Typography>

          {/* Abas de Navegação */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
            <Button
              variant="text"
              sx={{ fontWeight: 'bold', color: '#3F4E7A', borderBottom: '2px solid #3F4E7A' }}
              onClick={() => {
                navigate("/cadastro-clientes");
              }}
            >
              Dados Pessoais
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: 'bold', color: '#555' }}
              onClick={() => {
                navigate("/cadastro-documentos");
              }}
            >
              Documentos
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: 'bold', color: '#555' }}
              onClick={() => {
                navigate("/cadastro-processos");
              }}
            >
              Processo
            </Button>
          </Box>

          {/* Formulário de Dados Pessoais */}
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nome Completo"
              name="nome"
              value={clienteInfo.nome}
              onChange={handleInputChange}
              margin="normal"
              placeholder="Ex.: João Neto da Silva Pereira"
              InputProps={{
                startAdornment: (
                  <PersonOutlineIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Gênero"
                  name="genero"
                  value={clienteInfo.genero}
                  onChange={handleInputChange}
                  margin="normal"
                  select
                  defaultValue=""
                  InputProps={{
                    startAdornment: (
                      <PersonOutlineIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estado Civil"
                  name="estadoCivil"
                  value={clienteInfo.estadoCivil}
                  onChange={handleInputChange}
                  margin="normal"
                  select
                  defaultValue=""
                  InputProps={{
                    startAdornment: (
                      <PersonOutlineIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                >
                  <MenuItem value="Solteiro">Solteiro</MenuItem>
                  <MenuItem value="Casado">Casado</MenuItem>
                  <MenuItem value="Divorciado">Divorciado</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              value={clienteInfo.cpf}
              onChange={handleInputChange}
              margin="normal"
              placeholder="123.456.789-10"
              InputProps={{
                startAdornment: (
                  <HomeOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
            <TextField
              fullWidth
              label="CNPJ"
              name="cnpj"
              value={clienteInfo.cnpj}
              onChange={handleInputChange}
              margin="normal"
              placeholder="00.000.000/0000-00"
              InputProps={{
                startAdornment: (
                  <HomeOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
            <TextField
              fullWidth
              label="Telefone"
              name="telefone"
              value={clienteInfo.telefone}
              onChange={handleInputChange}
              margin="normal"
              placeholder="(81) 98762-2928"
              InputProps={{
                startAdornment: (
                  <PhoneOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={clienteInfo.email}
              onChange={handleInputChange}
              margin="normal"
              placeholder="joao.01@gmail.com"
              InputProps={{
                startAdornment: (
                  <EmailOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
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
                padding: '10px',
              }}
              onClick={() => {
                // Implementar a lógica de submissão ou navegação
                navigate("/cadastro-documentos");
              }}
            >
              Próximo
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CadastroClientes;
