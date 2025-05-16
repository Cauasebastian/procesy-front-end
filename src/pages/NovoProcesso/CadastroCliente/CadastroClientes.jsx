import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';
import { Header } from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosConfig'; // Utilize a instância configurada do axios

function CadastroClientes() {
  const [clienteInfo, setClienteInfo] = useState({
    nome: '',
    genero: '',
    estadoCivil: '',
    cpf: '',
    cnpj: '',
    telefone: '',
    email: '',
    naturalidade: '',
    dataNascimento: '',
  });

  const [loading, setLoading] = useState(false); // Estado de carregamento

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (!clienteInfo.nome) {
      alert('Nome é obrigatório.');
      return false;
    }
    if (!clienteInfo.email) {
      alert('E-mail é obrigatório.');
      return false;
    }
    // Adicione mais validações conforme necessário
    return true;
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!validateFields()) {
      return;
    }

    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    console.log('Token lido do localStorage:', token);

    if (!token) {
      alert('Autenticação necessária!');
      navigate('/login'); // Opcional: redirecionar para a página de login
      return;
    }

    // Formate a data de nascimento para ISO8601, se necessário
    const formattedDataNascimento = new Date(clienteInfo.dataNascimento).toISOString();

    const clientePayload = {
      nome: clienteInfo.nome,
      genero: clienteInfo.genero,
      estadoCivil: clienteInfo.estadoCivil,
      cpf_cnpj: clienteInfo.cpf || clienteInfo.cnpj, // Envia CPF ou CNPJ
      telefone: clienteInfo.telefone,
      email: clienteInfo.email,
      naturalidade: clienteInfo.naturalidade,
      dataNascimento: formattedDataNascimento, // Formatação ajustada
    };
    console.log('Dados do cliente:', clientePayload);

    setLoading(true); // Inicia o estado de carregamento

    try {
      // URL da API definida diretamente ou via proxy
      const response = await axios.post('/advogado/clientes', clientePayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      alert('Cliente cadastrado com sucesso!');
      console.log('Resposta da API:', response.data);
      localStorage.setItem('clienteId', response.data.id); // Salva o ID do cliente no localStorage
      navigate('/cadastro-documentos'); // Redireciona para a próxima página
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status diferente de 2xx
        console.error('Erro ao cadastrar cliente:', error.response.data);
        alert(`Erro ao cadastrar cliente: ${error.response.data.mensagem || error.message}`);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error('Erro ao cadastrar cliente: Nenhuma resposta do servidor', error.request);
        alert('Erro ao cadastrar cliente: Nenhuma resposta do servidor.');
      } else {
        // Algo aconteceu na configuração da requisição
        console.error('Erro ao cadastrar cliente:', error.message);
        alert(`Erro ao cadastrar cliente: ${error.message}`);
      }
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
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
          // height: '110vh',
          background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px', 
            minHeight: '600px',
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
          <Box sx={{ display: 'flex', gap: 10, mb: 3, justifyContent: 'center' }}>
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
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome Completo"
              name="nome"
              value={clienteInfo.nome}
              onChange={handleInputChange}
              margin="normal"
              placeholder="Ex.: João Neto da Silva Pereira"
              required
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
                  required
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
                  required
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
              // Opcional: Adicione validação para CPF/CNPJ
            />
            <TextField
              fullWidth
              label="CNPJ"
              name="cnpj"
              value={clienteInfo.cnpj}
              onChange={handleInputChange}
              margin="normal"
              placeholder="00.000.000/0000-00"
              // Opcional: Adicione validação para CPF/CNPJ
            />
            <TextField
              fullWidth
              label="Telefone"
              name="telefone"
              value={clienteInfo.telefone}
              onChange={handleInputChange}
              margin="normal"
              placeholder="(81) 98762-2928"
              required
            />
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={clienteInfo.email}
              onChange={handleInputChange}
              margin="normal"
              placeholder="joao.01@gmail.com"
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Naturalidade"
              name="naturalidade"
              value={clienteInfo.naturalidade}
              onChange={handleInputChange}
              margin="normal"
              placeholder="Ex.: Pernambucano"
              required
            />
            <TextField
              fullWidth
              label="Data de Nascimento"
              name="dataNascimento"
              value={clienteInfo.dataNascimento}
              onChange={handleInputChange}
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              required
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
              type="submit"
              disabled={loading} // Desativa o botão enquanto estiver carregando
            >
              {loading ? 'Processando...' : 'Próximo'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CadastroClientes;
