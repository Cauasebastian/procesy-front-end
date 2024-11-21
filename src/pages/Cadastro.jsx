import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Cadastro() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Esquerda - Formulário de Cadastro */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          px: 4,
        }}
      >
        <img
          src="/logo.png" // Substitua pelo caminho do logo
          alt="Logo"
          style={{ width: '80px', marginBottom: '16px' }}
        />
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Cadastro
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Crie sua conta preenchendo os campos abaixo
        </Typography>
        <Box component="form" sx={{ width: '100%', maxWidth: '360px' }}>
          <TextField
            fullWidth
            label="Nome Completo"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="E-mail"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#3F4E7A',
              ':hover': { backgroundColor: '#2F3C5E' },
              mt: 2,
            }}
          >
            Cadastrar
          </Button>
        </Box>
        <Typography sx={{ mt: 3 }}>
          Já tem uma conta?{' '}
          <Link href="/" underline="hover">
            Faça login
          </Link>
        </Typography>
      </Box>

      {/* Direita - Logo */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(to bottom, #e9f0f8, #f8fbfe)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <img
            src="/logo.png" // Substitua pelo caminho do logo
            alt="Logo"
            style={{ width: '150px', marginBottom: '16px' }}
          />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3F4E7A' }}>
            Procesy
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Cadastro;
