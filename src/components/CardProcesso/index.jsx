import * as S from './styles';
import { useNavigate, useLocation } from 'react-router-dom';

// Função para determinar a cor do status
const getStatusChipColor = (status) => {
  switch(status?.toLowerCase()) {
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

// Função para normalizar e garantir que estamos comparando corretamente os status
const normalizeStatus = (status) => {
  if (!status) return '';  // Caso o status seja undefined ou null
  return status.trim().toLowerCase();  // Remove espaços extras e converte para minúsculas
};

export const CardProcesso = ({ processo }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtém o caminho atual da URL

  // Verificar se o processo existe antes de acessar suas propriedades
  if (!processo) {
    return <div>Carregando...</div>; // Ou qualquer outra mensagem de erro
  }

  const handleClick = () => {
    navigate(`/processo/${processo.id}`);
  };

  // Aplica as cores de acordo com o status do processo
  const statusStyles = getStatusChipColor(processo?.status);

  // Lista os status dos documentos para contagem
  const documentosStatus = [
    normalizeStatus(processo?.statusContrato),
    normalizeStatus(processo?.statusProcuracoes),
    normalizeStatus(processo?.statusPeticoesIniciais),
    normalizeStatus(processo?.statusDocumentosComplementares),
  ];

  // Contagem de documentos pendentes e concluídos
  const statusCount = documentosStatus.reduce(
    (acc, status) => {
      if (status === 'concluído') {
        acc.concluidos += 1;
      } else if (status === 'pendente') {
        acc.pendentes += 1;
      }
      return acc;
    },
    { concluidos: 0, pendentes: 0 }
  );

  console.log('Status Count:', statusCount);  // Adicionando um log para depuração

  // Verificando se estamos na página de detalhes do processo
  const isProcessoDetailPage = location.pathname.includes('/processo/');

  return (
    <S.ContainerCard>
      <S.StatusProcessContainer bgColor={statusStyles.backgroundColor}>
        <S.BallStatusProcess bgColor={statusStyles.color} />
        <S.TextProcessStatus color={statusStyles.color}>
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

      {/* Exibe a contagem de documentos pendentes e concluídos */}
      <S.SectionValues>
        <S.LabelField>Documentos</S.LabelField>
        <S.ValueField>
          Concluídos: {statusCount.concluidos} | Pendentes: {statusCount.pendentes}
        </S.ValueField>
      </S.SectionValues>

      {/* Condicional para exibir o botão de "Ver mais" apenas quando não estiver na página de detalhes */}
      {!isProcessoDetailPage && (
        <S.ButtonMoreInfo onClick={handleClick}>Ver mais</S.ButtonMoreInfo>
      )}
    </S.ContainerCard>
  );
};