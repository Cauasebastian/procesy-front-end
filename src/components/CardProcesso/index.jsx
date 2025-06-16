import * as S from './styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from "../../lib/axios";

const getStatusChipColor = (status) => {
  switch(status?.toLowerCase()) {
    case 'concluído':
      return { backgroundColor: '#D4EDDA', color: '#155724' };
    case 'em andamento':
      return { backgroundColor: '#FFF3CD', color: '#856404' };
    case 'pendente':
      return { backgroundColor: '#F8D7DA', color: '#721C24' };
    default:
      return { backgroundColor: '#E2E3E5', color: '#6C757D' };
  }
};

const normalizeStatus = (status) => {
  return status ? status.trim().toLowerCase() : '';
};

export const CardProcesso = ({ processo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previsaoDias, setPrevisaoDias] = useState(null);
  const [loadingPrevisao, setLoadingPrevisao] = useState(false);
  const [errorPrevisao, setErrorPrevisao] = useState(null);

  const fetchPrevisao = async () => {
    if (!processo?.id) return;
    
    setLoadingPrevisao(true);
    setErrorPrevisao(null);
    
    try {
      const response = await api.post(`/api/machine-learning/previsao/${processo.id}`);
      setPrevisaoDias(response.data);
    } catch (error) {
      setErrorPrevisao('Erro ao carregar previsão');
      console.error('Erro na previsão:', error);
    } finally {
      setLoadingPrevisao(false);
    }
  };

  useEffect(() => {
    fetchPrevisao();
  }, [processo?.id]);

  const handleClick = () => {
    navigate(`/processo/${processo.id}`);
  };

  const statusStyles = getStatusChipColor(processo?.status);

  const documentosStatus = [
    normalizeStatus(processo?.statusContrato),
    normalizeStatus(processo?.statusProcuracoes),
    normalizeStatus(processo?.statusPeticoesIniciais),
    normalizeStatus(processo?.statusDocumentosComplementares),
  ];

  const statusCount = documentosStatus.reduce(
    (acc, status) => {
      if (status === 'concluído') acc.concluidos += 1;
      else if (status === 'pendente') acc.pendentes += 1;
      return acc;
    },
    { concluidos: 0, pendentes: 0 }
  );

  const isProcessoDetailPage = location.pathname.includes('/processo/');

  return (
    <S.ContainerCard>
      <S.StatusProcessContainer $bgColor={statusStyles.backgroundColor}>
        <S.BallStatusProcess $bgColor={statusStyles.color} />
        <S.TextProcessStatus $color={statusStyles.color}>
          {processo?.status || "Status não disponível"}
        </S.TextProcessStatus>
      </S.StatusProcessContainer>

      <S.SectionValues>
        <S.LabelField>Número</S.LabelField>
        <S.ValueField>{processo?.numeroProcesso || "Não especificado"}</S.ValueField>
      </S.SectionValues>

      <S.SectionValues>
        <S.LabelField>Data Status</S.LabelField>
        <S.ValueField>{processo?.dataAtualizacao || "Não especificada"}</S.ValueField>
      </S.SectionValues>

      <S.SectionValues>
        <S.LabelField>Ação</S.LabelField>
        <S.ValueField>{processo?.tipoProcesso || "Não especificado"}</S.ValueField>
      </S.SectionValues>

      <S.SectionValues>
        <S.LabelField>Cliente</S.LabelField>
        <S.ValueField>{processo?.cliente?.nome || "Nome não especificado"}</S.ValueField>
      </S.SectionValues>

      <S.SectionValues>
        <S.LabelField>Documentos</S.LabelField>
        <S.DocumentStatusContainer>
          <S.CompletedBadge>
            {statusCount.concluidos} concluídos
          </S.CompletedBadge>
          <S.PendingBadge>
            {statusCount.pendentes} pendentes
          </S.PendingBadge>
        </S.DocumentStatusContainer>
      </S.SectionValues>

      <S.SectionValues>
        <S.LabelField>Previsão de Conclusão</S.LabelField>
        <S.ValueField>
          {loadingPrevisao ? (
            <S.LoadingText>Calculando...</S.LoadingText>
          ) : errorPrevisao ? (
            <S.ErrorText>{errorPrevisao}</S.ErrorText>
          ) : previsaoDias !== null ? (
            <S.PrevisaoValue $dias={previsaoDias}>
              {previsaoDias} dia{previsaoDias !== 1 ? 's' : ''}
            </S.PrevisaoValue>
          ) : (
            'Não disponível'
          )}
        </S.ValueField>
      </S.SectionValues>

      {!isProcessoDetailPage && (
        <S.ButtonMoreInfo onClick={handleClick}>Ver mais</S.ButtonMoreInfo>
      )}
    </S.ContainerCard>
  );
};