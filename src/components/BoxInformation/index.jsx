import * as S from './styles';

export const BoxInformation = ({ processos }) => {
  // Contagem dos processos por status
  const statusCounts = processos.reduce(
    (acc, processo) => {
      const status = processo.status.toLowerCase();
      if (status === 'concluído') {
        acc.concluido += 1;
      } else if (status === 'em andamento') {
        acc.emAndamento += 1;
      } else if (status === 'pendente') {
        acc.naoIniciado += 1;
      }
      return acc;
    },
    { concluido: 0, emAndamento: 0, naoIniciado: 0 }
  );

  return (
    <S.ContainerBoxes>
      <S.BoxTotal>
        <S.TextValueTotal>{processos.length}</S.TextValueTotal>
        <S.DescriptionBoxTotal>Total de Processos</S.DescriptionBoxTotal>
      </S.BoxTotal>
      <S.BoxOtherInfo>
        <S.TextValue>{statusCounts.naoIniciado}</S.TextValue>
        <S.DescriptionBoxOther>Não iniciados</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
      <S.BoxOtherInfo>
        <S.TextValue>{statusCounts.emAndamento}</S.TextValue>
        <S.DescriptionBoxOther>Em andamento</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
      <S.BoxOtherInfo>
        <S.TextValue>{statusCounts.concluido}</S.TextValue>
        <S.DescriptionBoxOther>Concluídos</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
    </S.ContainerBoxes>
  );
};
