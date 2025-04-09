import { CardProcesso } from '../CardProcesso'
import * as S from './styles'
import { useNavigate } from 'react-router-dom'

export function SectionCurrentProcess() {
  const navigate = useNavigate()
    return(
      <S.ContainerProcessos>
        <S.HeaderProcessos>
          <S.TitleHeader>Atualizações dos Processos</S.TitleHeader>
          <S.ButtonChatBot onClick={() => navigate('/chatbot')}>ChatBot</S.ButtonChatBot>
        </S.HeaderProcessos>
        <S.ContainerCards>
          <CardProcesso />
          <CardProcesso />
          <CardProcesso/>
        </S.ContainerCards>
        <S.ButtonSeeProcess>Ver todos os processos</S.ButtonSeeProcess>
      </S.ContainerProcessos>
    )
}