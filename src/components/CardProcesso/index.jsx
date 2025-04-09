import * as S from "./styles"

export const CardProcesso = () => {
  return (
    <S.ContainerCard>
      <S.StatusProcessContainer bgColor='#EDFAEE'>
        <S.BallStatusProcess bgColor='#1DC32E' />
        <S.TextProcessStatus color='#4A4A4A'>Ativo</S.TextProcessStatus>
      </S.StatusProcessContainer>
      <S.SectionValues>
        <S.LabelField>Número</S.LabelField>
        <S.ValueField>124</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Data Status</S.LabelField>
        <S.ValueField>23/03/2019</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Ação</S.LabelField>
        <S.ValueField>Usucapião</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Cliente</S.LabelField>
        <S.ValueField>João Carlos da Silva</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Número do processo</S.LabelField>
        <S.ValueField>PRO.0010891</S.ValueField>
      </S.SectionValues>
      <S.ButtonMoreInfo>Ver mais</S.ButtonMoreInfo>
    </S.ContainerCard>
  )
}