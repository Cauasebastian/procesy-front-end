import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxInformation } from '../../components/BoxInformation';
import { Header } from '../../components/Header';
import axios from '../../utils/axiosConfig';
import { SectionCurrentProcess } from '../../components/SectionProcessos';
import * as S from './styles';

const Menu = () => {
  const navigate = useNavigate();

  const [processos, setProcessos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [chartData, setChartData] = useState([]);
  const [totalProcessos, setTotalProcessos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const processosResponse = await axios.get('/advogado/processos');
        setProcessos(processosResponse.data);

        const clientesResponse = await axios.get('/advogado/clientes');
        setClientes(clientesResponse.data);

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
            color: '#4caf50',
          },
          {
            id: 'emAndamento',
            value: statusCounts.emAndamento,
            label: 'Em Andamento',
            color: '#ff9800',
          },
          {
            id: 'pendente',
            value: statusCounts.pendente,
            label: 'Pendentes',
            color: '#f44336',
          },
        ];

        setChartData(processedChartData);
        setTotalProcessos(processosResponse.data.length);
        setTotalClientes(clientesResponse.data.length);
      } catch (err) {
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
        <BoxInformation
          processos={processos}
        />
        <SectionCurrentProcess processos={processos} />
      </S.ContainerMenu>
    </>
  );
};

export default Menu;
