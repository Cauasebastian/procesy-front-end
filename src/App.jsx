import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'; 
import Login from './pages/Login/Login';
import Clientes from './pages/Clientes/Clientes';
import Cadastro from './pages/Cadastro/Cadastro';
import Processos from './pages/Processos/Processos';
import NovoProcesso from './pages/NovoProcesso/NovoProcesso';
import Menu from './pages/Menu/Menu';
import CadastroClientes from './pages/NovoProcesso/CadastroCliente/CadastroClientes';
import CadastroProcessos from './pages/NovoProcesso/CadastroProcessos/CadastroProcessos';
import CadastroDocumentos from './pages/NovoProcesso/CadastroDocumentos/CadastroDocumentos';
import Processo from './pages/Processo/Processo';
import ChatBotPage from './pages/ChatBot/ChatBot';
import GlobalStyle from './GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ProcessProvider } from './contexts/ProcessContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ProcessProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/processos" element={<Processos />} />
              <Route path="/chatbot" element={<ChatBotPage />} />
              <Route path="/processo/:processoId" element={<Processo />} />
              <Route path="/cadastro-processos" element={<CadastroProcessos />} />
              <Route path="/cadastro-documentos" element={<CadastroDocumentos />} />
              <Route path="/cadastro-clientes" element={<CadastroClientes />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/novo-processo" element={<NovoProcesso />} />
            </Routes>
          </Router>
        </Box>
      </ProcessProvider>
    </ThemeProvider>
  );
}

export default App;
