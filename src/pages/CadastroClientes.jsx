import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function CadastroClientes() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #e9f0f8, #f8fbfe)',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '90%', // Ajuste para responsividade
          maxWidth: '700px', // Limite para telas maiores
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Cadastro do Cliente
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nome Completo"
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
            margin="normal"
            placeholder="joao.01@gmail.com"
            InputProps={{
              startAdornment: (
                <EmailOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#3F4E7A',
              ':hover': { backgroundColor: '#2F3C5E' },
              fontWeight: 'bold',
            }}
          >
            Próximo
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CadastroClientes;
