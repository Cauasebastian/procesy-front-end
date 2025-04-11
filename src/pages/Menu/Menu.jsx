
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { BoxInformation } from '../../components/BoxInformation';
import { Header } from '../../components/Header/index'; // Ajuste o caminho conforme a estrutura do seu projeto
import { SectionCurrentProcess } from '../../components/SectionProcessos';
import * as S from './styles'
import { api } from '../../lib/axios';

const Menu = () => {
  // const navigate = useNavigate();

  // Estados para armazenar processos e clientes
  const [process, setProcess] = useState([]);
  const [completedProcess, setCompletedProcess] = useState(0);
  const [inProgressProcess, setInProgressProcess] = useState(0);
  const [uninitiatedProcess, setUninitiatedProcess] = useState(0);

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [totalProcess, setTotalProcess] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token")
      try {
        const clientesResponse = await api.get('/advogado/clientes', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const processosResponse = await api.get('/advogado/processos', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        setProcess(processosResponse.data);

        const finalizados = process.filter(p => p.status === 'Finalizado').length;
        const emAndamento = process.filter(p => p.status === 'Em andamento').length;
        const naoIniciados = process.filter(p => p.status === 'Não iniciado').length;

        setCompletedProcess(finalizados);
        setInProgressProcess(emAndamento);
        setUninitiatedProcess(naoIniciados);

        
        console.log(clientesResponse.data)
        console.log(processosResponse.data)
        setClientes(clientesResponse.data);

        

        setTotalProcess(processosResponse.data.length);
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
  }, [process]);



  return (
    <>
      <Header />
      <S.ContainerMenu>
        <BoxInformation
          total={totalProcess ?? 0}
          inProgress={inProgressProcess ?? 0}
          uninitiated={uninitiatedProcess ?? 0}
          completed={completedProcess ?? 0}
        />
        <SectionCurrentProcess allProcess={process}/>
      </S.ContainerMenu>
      
    </>
  );
};

export default Menu;