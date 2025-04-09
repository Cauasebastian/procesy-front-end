// src/pages/Menu/Menu.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxInformation } from '../../components/BoxInformation';
import { Header } from '../../components/Header/index'; // Ajuste o caminho conforme a estrutura do seu projeto
import axios from '../../utils/axiosConfig'; // Utilize a instância configurada do axios
import { SectionCurrentProcess } from '../../components/SectionProcessos';
import * as S from './styles'

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


  return (
    <>
      <Header />
      <S.ContainerMenu>
        <BoxInformation/>
        <SectionCurrentProcess/>
      </S.ContainerMenu>
      
    </>
  );
};

export default Menu;