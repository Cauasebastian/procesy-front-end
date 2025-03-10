import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Para salvar o token no cookie
import logo from "../../assets/logo.svg";
import styles from "./style.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL não está definido.");
}

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPrivateKey(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleLogin = async () => {
    if (!privateKey) {
      alert("Por favor, carregue sua chave privada!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("privateKey", privateKey); // Armazena a chave
        console.log(data);
        
        navigate("/menu");
      } else {
        alert("Erro no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      console.log(response);
      alert("Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Esquerda - Login */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
        }}
      >
        <img src={logo} alt="Logo" style={{ width: "80px", marginBottom: "16px" }} />
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Login
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 3 }}>
          Entre com seu usuário e senha para logar
        </Typography>
        <Box component="form" sx={{ width: "100%", maxWidth: "360px" }}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {/* Campo de upload da chave */}
      <TextField
        type="file"
        fullWidth
        label="Chave Privada"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleFileChange}
      />
          <Typography
            variant="body2"
            sx={{ textAlign: "right", mt: 1, mb: 2, color: "text.secondary" }}
          >
            <Link href="#" underline="hover">
              Esqueceu a senha?
            </Link>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3F4E7A",
              ":hover": { backgroundColor: "#2F3C5E" },
            }}
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Box>
        <Typography sx={{ mt: 3 }}>
          Não tem uma conta?{" "}
          <a
            className={styles.link}
            onClick={() => {
              navigate("/cadastro");
            }}
          >
            Registre-se
          </a>
        </Typography>
      </Box>

      {/* Direita - Logo */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(to bottom, #e9f0f8, #f8fbfe)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "150px", marginBottom: "16px" }}
          />
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3F4E7A" }}>
            Procesy
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
