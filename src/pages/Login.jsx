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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', // Define layout em linha (lado a lado)
        width: '100vw', // Ocupe a largura total da tela
        height: '100vh', // Ocupe a altura total da tela
        overflow: 'hidden',
      }}
    >
      {/* Esquerda - Login */}
      <Box
        sx={{
          flex: 1, // Ocupe 50% da largura
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 4, // Espaçamento interno
        }}
      >
        <img
          src="/logo.png" // Substitua pelo caminho do logo
          alt="Logo"
          style={{ width: '80px', marginBottom: '16px' }}
        />
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Login
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Entre com seu usuário e senha para logar
        </Typography>
        <Box component="form" sx={{ width: '100%', maxWidth: '360px' }}>
          <TextField
            fullWidth
            label="Usuário"
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
          <Typography
            variant="body2"
            sx={{ textAlign: 'right', mt: 1, mb: 2, color: 'text.secondary' }}
          >
            <Link href="#" underline="hover">
              Esqueceu a senha?
            </Link>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#3F4E7A',
              ':hover': { backgroundColor: '#2F3C5E' },
            }}
          >
            Entrar
          </Button>
        </Box>
        <Typography sx={{ mt: 3 }}>
          Não tem uma conta?{' '}
          <Link href="#" underline="hover">
            Registre-se
          </Link>
        </Typography>
      </Box>

      {/* Direita - Logo */}
      <Box
        sx={{
          flex: 1, // Ocupe 50% da largura
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

export default Login;
