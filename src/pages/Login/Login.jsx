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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Salvar o token com configurações de segurança
        Cookies.set("token", data.token, {
          secure: true, // O cookie será enviado apenas via HTTPS
          sameSite: "Strict", // Previne envio de cookies em requisições cross-site
          expires: 1, // O token expira em 1 dia
        });
  
        console.log("Token salvo no cookie:", data.token);
        console.log("Token lido do cookie:", Cookies.get("token"));
        alert("Login realizado com sucesso!");
        navigate("/menu");
      } else {
        alert("Erro no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
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
