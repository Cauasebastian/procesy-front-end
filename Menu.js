// src/pages/Menu/Menu.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/index'; // Ajuste o caminho conforme a estrutura do seu projeto
import axios from '../../utils/axiosConfig'; // Utilize a instância configurada do axios

const Menu = () => {
  const navigate = useNavigate();

  // Estados para armazenar processos e clientes
  const [processos, setProcessos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para processamento dos dados do gráfico
  const [chartData, setChartData] = useState([]);
  const [totalProcessos, setTotalProcessos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Buscar processos
        const processosResponse = await axios.get('/advogado/processos');
        setProcessos(processosResponse.data);

        // Buscar clientes
        const clientesResponse = await axios.get('/advogado/clientes');
        setClientes(clientesResponse.data);

        // Processar dados para o gráfico
        const statusCounts = processosResponse.data.reduce(
          (acc, processo) => {
            const status = processo.status.toLowerCase();
            if (status === 'concluído') {
              acc.concluido += 1;
            } else if (status === 'em andamento') {
              acc.emAndamento += 1;
            } else if (status === 'pendente') {
              acc.pendente += 1;
            }
            return acc;
          },
          { concluido: 0, emAndamento: 0, pendente: 0 }
        );

        const processedChartData = [
          {
            id: 'concluido',
            value: statusCounts.concluido,
            label: 'Concluídos',
            color: '#4caf50', // Verde
          },
          {
            id: 'emAndamento',
            value: statusCounts.emAndamento,
            label: 'Em Andamento',
            color: '#ff9800', // Laranja
          },
          {
            id: 'pendente',
            value: statusCounts.pendente,
            label: 'Pendentes',
            color: '#f44336', // Vermelho
          },
        ];

        setChartData(processedChartData);
        setTotalProcessos(processosResponse.data.length);
        setTotalClientes(clientesResponse.data.length);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError(
          err.response?.data?.mensagem ||
            err.message ||
            'Erro ao buscar dados do servidor.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
            padding: 2,
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Main Layout */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100vw',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          paddingTop: '30px',
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '700px',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Total and Clientes Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                flex: 1,
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              Total: {totalProcessos} Processos
            </Button>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
                borderColor: '#ccc',
                color: '#3F4E7A',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              {totalClientes} Clientes
            </Button>
          </Box>

          {/* New Process and New Client Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate('/novo-processo');
              }}
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                flex: 1,
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              Novo Processo
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/clientes'); // Adicione a rota correta para "Meus Clientes"
              }}
              sx={{
                flex: 1,
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              Meus Clientes
            </Button>
          </Box>

          {/* Card with Pie Chart */}
          <Card
            sx={{
              width: '100%',
              backgroundColor: '#f8f9fa',
              boxShadow: 2,
              borderRadius: 4,
              p: 3,
              mb: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  mb: 3,
                }}
              >
                Processos
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' }, // Responsividade
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                {/* Pie Chart */}
                <PieChart
                  series={[
                    {
                      data: chartData,
                      innerRadius: 0.5,
                    },
                  ]}
                  width={500}
                  height={250}
                />

                {/* Legenda do Gráfico */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    marginLeft: { md: 4 },
                    marginTop: { xs: 2, md: 0 },
                  }}
                >
                  {chartData.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap', // Evita quebra de linha
                      }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          backgroundColor: item.color,
                          borderRadius: '50%',
                          marginRight: 1,
                        }}
                      ></Box>
                      <Typography
                        variant="body1"
                        sx={{
                          display: 'inline', // Garante que o texto fique na mesma linha
                        }}
                      >
                        {item.label}: {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Processos Button */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/processos');
              }}
              sx={{
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                borderRadius: 20,
                px: 6,
                py: 2,
                fontSize: '1rem',
              }}
            >
              Ver Processos
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Menu;