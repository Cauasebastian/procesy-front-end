import * as S from './styles'

export const BoxInformation = () => {
  return (
    <S.ContainerBoxes>
      <S.BoxTotal>
        <S.TextValueTotal>21</S.TextValueTotal>
        <S.DescriptionBoxTotal>Total</S.DescriptionBoxTotal>
      </S.BoxTotal>
      <S.BoxOtherInfo>
         <S.TextValue>6</S.TextValue>
        <S.DescriptionBoxOther>Não iniciados</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
       <S.BoxOtherInfo>
         <S.TextValue>12</S.TextValue>
        <S.DescriptionBoxOther>Em andamento</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
       <S.BoxOtherInfo>
         <S.TextValue>3</S.TextValue>
        <S.DescriptionBoxOther>Concluídos</S.DescriptionBoxOther>
      </S.BoxOtherInfo>
    </S.ContainerBoxes>
  )
}