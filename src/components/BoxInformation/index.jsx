import * as S from './styles'

// eslint-disable-next-line react/prop-types
export const BoxInformation = ({total, uninitiated, inProgress, completed }) => {
  return (
    <S.ContainerBoxes>
      <S.BoxTotal>
        <S.TextValueTotal>{total}</S.TextValueTotal>
        <S.DescriptionBoxTotal>Total</S.DescriptionBoxTotal>
      </S.BoxTotal>
      <S.BoxOtherInfo>
         <S.TextValue>{uninitiated}</S.TextValue>
        <S.DescriptionBoxOther>Não iniciados</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
       <S.BoxOtherInfo>
         <S.TextValue>{inProgress}</S.TextValue>
        <S.DescriptionBoxOther>Em andamento</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
       <S.BoxOtherInfo>
        <S.TextValue>{ completed}</S.TextValue>
        <S.DescriptionBoxOther>Concluídos</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
    </S.ContainerBoxes>
  )
}