import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'; 
import Login from './pages/Login/Login';
import Clientes from './pages/Clientes/Clientes';
import Cadastro from './pages/Cadastro/Cadastro';
import Processos from './pages/Processos/Processos';
import NovoProcesso from './pages/NovoProcesso/NovoProcesso';
import Menu from './pages/Menu/Menu';
import CadastroClientes from './pages/NovoProcesso/CadastroCliente/CadastroClientes';
import CadastroProcessos from './pages/NovoProcesso/CadastroProcessos/CadastroProcessos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroDocumentos from './pages/NovoProcesso/CadastroDocumentos/CadastroDocumentos';

import Processo from './pages/Processo/Processo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Cor primária
    },
    secondary: {
      main: '#dc004e', // Cor secundária
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/processos" element={<Processos />} />
            <Route path='/processo/:id' element={<Processo/>}/>

             <Route path="/cadastro-processos" element={<CadastroProcessos />} /> 
             <Route path='/cadastro-documentos' element={<CadastroDocumentos/>}/>
             <Route path="/cadastro-clientes" element={<CadastroClientes />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path='/novo-processo' element={<NovoProcesso />} >
              
              
              
            </Route>
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
