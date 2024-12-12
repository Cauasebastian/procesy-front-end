import React, { useState } from "react";
import styles from "./style.module.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL não está definido.");
}

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCadastro = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso! Você pode fazer login agora.");
        navigate("/"); // Redireciona para a página de login
      } else {
        const errorData = await response.json();
        alert(`Erro no cadastro: ${errorData.message || "Verifique os dados."}`);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // Alinhar os elementos lado a lado
        width: "100vw", // Ocupar toda a largura da tela
        height: "100vh", // Ocupar toda a altura da tela
        overflow: "hidden",
      }}
    >
      {/* Esquerda - Formulário de Cadastro */}
      <Box
        sx={{
          flex: 1, // Ocupar 50% da largura
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4, // Espaçamento interno
        }}
      >
        <img
          src={logo} // Substitua pelo caminho do logo
          alt="Logo"
          style={{ width: "80px", marginBottom: "16px" }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Cadastro
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 3 }}>
          Crie sua conta preenchendo os campos abaixo
        </Typography>
        <Box component="form" sx={{ width: "100%", maxWidth: "360px" }}>
          <TextField
            fullWidth
            label="Nome Completo"
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
              backgroundColor: "#3F4E7A",
              ":hover": { backgroundColor: "#2F3C5E" },
              mt: 2,
            }}
            onClick={handleCadastro}
          >
            Cadastrar
          </Button>
        </Box>
        <Typography sx={{ mt: 3 }}>
          Já tem uma conta?{" "}
          <a
            className={styles.link}
            onClick={() => {
              navigate("/");
            }}
          >
            Faça login
          </a>
        </Typography>
      </Box>

      {/* Direita - Logo */}
      <Box
        sx={{
          flex: 1, // Ocupar 50% da largura
          background: "linear-gradient(to bottom, #e9f0f8, #f8fbfe)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img
            src={logo} // Substitua pelo caminho do logo
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

export default Cadastro;
