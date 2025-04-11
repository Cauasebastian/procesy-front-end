import { useEffect, useState } from "react"
import * as S from "./styles"

// eslint-disable-next-line react/prop-types
export const CardProcesso = ({processType, initialDate, clientName, processNumber, clientTelephone, processStatus}) => {
  
  const [colorStatusBg, setColorStatusBg] = useState("")
  const [colorBallStatus, setColorBallStatus] = useState("")
  const [colorTextStatus, setColorTextStatus] = useState("")

  useEffect(() => {
    if (processStatus === "Em andamento") {
      setColorStatusBg("#ffeeb0")
      setColorBallStatus("#c3aa1d")
      setColorTextStatus("#000000")
    }
    if (processStatus === "Finalizado") {
      setColorStatusBg("#d4fdd8")
      setColorTextStatus("#000000")
      setColorBallStatus("#1DC32E")
    }
    if (processStatus === "Não iniciado") {
      setColorStatusBg("#fdd4d4")
      setColorTextStatus("#000000")
      setColorBallStatus("#c31d1d")
    }
  }, [processStatus])
  return (
    <S.ContainerCard>
      <S.StatusProcessContainer bgColor={colorStatusBg}>
        <S.BallStatusProcess bgColor={ colorBallStatus} />
        <S.TextProcessStatus color={colorTextStatus}>{processStatus}</S.TextProcessStatus>
      </S.StatusProcessContainer>
      <S.SectionValues>
        <S.LabelField>Tipo</S.LabelField>
        <S.ValueField>{processType}</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Início</S.LabelField>
        <S.ValueField>{initialDate}</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Telefone</S.LabelField>
        <S.ValueField>{clientTelephone}</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Cliente</S.LabelField>
        <S.ValueField>{clientName}</S.ValueField>
      </S.SectionValues>
      <S.SectionValues>
        <S.LabelField>Número do processo</S.LabelField>
        <S.ValueField>{processNumber}</S.ValueField>
      </S.SectionValues>
      <S.ButtonMoreInfo>Ver mais</S.ButtonMoreInfo>
    </S.ContainerCard>
  )
}