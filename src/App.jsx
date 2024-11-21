import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Menu from './pages/Menu'
import CadastroClientes from './pages/CadastroClientes'
import CadastroProcessos from './pages/CadastroProcessos'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastro-clientes" element={<CadastroClientes />} />
        <Route path="/cadastro-processos" element={<CadastroProcessos />} />
      </Routes>
    </Router>
  )
}

export default App
