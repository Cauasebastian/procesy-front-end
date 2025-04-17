import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBack from '../../assets/btn-back.svg'
import { Header } from '../../components/Header';
import * as S from './styles.js'
import axios from 'axios'; // Certifique-se de ter o axios instalado
import { useProcess } from '../../contexts/ProcessContext.jsx';
import { CardProcesso } from '../../components/CardProcesso/index.jsx';

export default function Processos(){
  const navigate = useNavigate();
    const { process } = useProcess();
    const [searchTerm, setSearchTerm] = useState('');
    const [processos, setProcessos] = useState([]); // Estado para armazenar os processos
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL não está definido.");
      }

    useEffect(() => {
        // Função para obter os processos do backend
        const fetchProcessos = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token'); // Obtém o token do localStorage
                if (!token) {
                    throw new Error('Autenticação necessária. Por favor, faça login novamente.');
                }

                const response = await axios.get(`${API_BASE_URL}/advogado/processos`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setProcessos(response.data); // Assume que response.data é um array de ProcessoDTO
            } catch (err) {
                console.error('Erro ao obter processos:', err);
                setError(err.response?.data?.mensagem || err.message || 'Erro ao obter processos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProcessos();
    }, []);

    function redirectToDetails(processo){
        navigate(`/processo/${processo.id}`, { state: { processo }, replace: false});
    }

    // Função para filtrar os processos com base no termo de pesquisa
    const filteredProcessos = processos.filter(processo => 
        processo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.tipoProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.codProcesso?.toLowerCase().includes(searchTerm.toLowerCase()) // Verifique se codProcesso existe
    ); 

    // Função para determinar a cor do Chip baseado no status
    const getStatusChipColor = (status) => {
        switch(status.toLowerCase()) {
            case 'concluído':
                return { backgroundColor: '#D4EDDA', color: '#155724' }; // Verde claro
            case 'em andamento':
                return { backgroundColor: '#FFF3CD', color: '#856404' }; // Amarelo claro
            case 'pendente':
                return { backgroundColor: '#F8D7DA', color: '#721C24' }; // Vermelho claro
            default:
                return { backgroundColor: '#E2E3E5', color: '#6C757D' }; // Cinza
        }
    };

  return (
    <>
      <Header/>
        <S.ContainerGeral>
        <S.ContainerGoBack onClick={() => navigate(-1)}>
          <S.ImageArrow src={ButtonBack } />
          <S.TextBack>Processos</S.TextBack>
        </S.ContainerGoBack>
        <S.ContainerProcess>
          <S.HeaderProcessos>
            <S.ContainerSearchProcess>
              <S.InputSearch placeholder='Busque por nome do cliente ou número do processo'/>
              <S.ButtonSearch>Pesquisar</S.ButtonSearch>
            </S.ContainerSearchProcess>
            <S.ContainerButtons>
              <S.ButtonNewProcess>Novo Processo</S.ButtonNewProcess>
              <S.ButtonNewClient onClick={() => navigate('/clientes')}>Ver clientes</S.ButtonNewClient>
            </S.ContainerButtons>
          </S.HeaderProcessos>
          {process.map((process) => (
            <CardProcesso
              key={process.id}
              processStatus={process.status}
              processType={process.tipoProcesso}
              initialDate={process.dataInicio}
              clientTelephone={process.cliente.telefone}
              clientName={process.cliente.nome}
              processNumber={process.numeroProcesso}
              processoId={process.id}
            />
          ))}
        </S.ContainerProcess>
      </S.ContainerGeral>
      </>
      
    )
}