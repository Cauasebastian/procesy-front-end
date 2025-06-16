import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonBack from '../../assets/btn-back.svg'
import {
  Container,
  InputSearch,
  SearchButton,
  ActionButtons,
  ActionButton,
  CardsContainer,
  Card,
  CardHeader,
  StatusChip,
  CardContent,
  AttributeTitle,
  AttributeValue,
  EmptyMessage,
  ContainerGoBack, ImageArrow, TextBack,
  WrapperProcess,
  HeaderContainerProcess,
  WrapperSearch,
  SectionValues
} from './styles'
import { Header } from '../../components/Header';
import { ArrowBack, FilterList, Add, PersonAdd, MoreVert } from '@mui/icons-material';

export default function Processos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL não está definido.');
  }

  useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Autenticação necessária.');

        const response = await axios.get(`${API_BASE_URL}/advogado/processos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProcessos(response.data);
      } catch (err) {
        console.error('Erro ao obter processos:', err);
        setError(err.response?.data?.mensagem || err.message || 'Erro ao obter processos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProcessos();
  }, []);

  function redirectToDetails(processo) {
    navigate(`/processo/${processo.id}`, { state: { processo }, replace: false });
  }

  const filteredProcessos = processos.filter((processo) =>
    processo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.tipoProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.codProcesso?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'concluído':
        return { background: '#D4EDDA', color: '#155724' };
      case 'em andamento':
        return { background: '#FFF3CD', color: '#856404' };
      case 'pendente':
        return { background: '#F8D7DA', color: '#721C24' };
      default:
        return { background: '#E2E3E5', color: '#6C757D' };
    }
  };

  return (
    <>
     <Header />
     <Container>
      <ContainerGoBack onClick={() => navigate(-1)}>
        <ImageArrow src={ButtonBack} />
        <TextBack>Processos</TextBack>
      </ContainerGoBack>

      <WrapperProcess>
        <HeaderContainerProcess>
            <WrapperSearch>
              <InputSearch
                placeholder="Cliente, número do processo, ação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton onClick={() => console.log('Pesquisar')}>Pesquisar</SearchButton>
            </WrapperSearch>
            
          

          <ActionButtons>
            <ActionButton onClick={() => navigate('/novo-processo')}>
              Novo Processo <Add />
            </ActionButton>
            <ActionButton onClick={() => navigate('/novo-processo')}>
              Novo Cliente <PersonAdd />
            </ActionButton>
          </ActionButtons>
        </HeaderContainerProcess>
        


        <CardsContainer>
          {filteredProcessos.length === 0 && !loading && !error && (
            <EmptyMessage>Nenhum processo encontrado.</EmptyMessage>
          )} 
          {filteredProcessos.map((processo) => ( 
              <Card 
                key={processo.id} 
                onClick={() => navigate(`/processo/${processo.id}`)}
                style={{ cursor: "pointer" }} // Adiciona indicador visual
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                <CardHeader>
                  <StatusChip style={getStatusStyle(processo?.status)}>
                    {processo?.status}
                  </StatusChip>
                </CardHeader>
                <SectionValues>
                  <AttributeTitle>Número do Processo</AttributeTitle>
                  <AttributeValue>{processo?.numeroProcesso}</AttributeValue>
                </SectionValues>
                <SectionValues>
                  <AttributeTitle>Cliente</AttributeTitle>
                  <AttributeValue>{processo?.cliente?.nome}</AttributeValue>
                </SectionValues>
                <SectionValues>
                  <AttributeTitle>Data de Início</AttributeTitle>
                  <AttributeValue>{new Date(processo?.dataInicio).toLocaleDateString()}</AttributeValue>
                </SectionValues>
                <SectionValues>
                  <AttributeTitle>Data de Atualização</AttributeTitle>
                  <AttributeValue>{new Date(processo.dataAtualizacao).toLocaleDateString()}</AttributeValue>
                </SectionValues>
                <SectionValues>
                  <AttributeTitle>Tipo de Processo</AttributeTitle>
                  <AttributeValue>{processo.tipoProcesso}</AttributeValue>
                </SectionValues>
                <SectionValues>
                  <AttributeTitle>Tipo de Atendimento</AttributeTitle>
                  <AttributeValue>{processo.tipoAtendimento}</AttributeValue>
                </SectionValues>
                <MoreVert style={{ color: '#AAAAAA' }} />
            </Card>
          ))} 
        </CardsContainer>
      </WrapperProcess>
    </Container>
    </>
  );
}
