/* eslint-disable react/prop-types */
import { CardProcesso } from '../CardProcesso'
import * as S from './styles'
import { useNavigate } from 'react-router-dom'

export function SectionCurrentProcess({allProcess}) {
  const navigate = useNavigate()
    return(
      <S.ContainerProcessos>
        <S.HeaderProcessos>
          <S.TitleHeader>Atualizações dos Processos</S.TitleHeader>
          <S.ButtonChatBot onClick={() => navigate('/chatbot')}>ChatBot</S.ButtonChatBot>
        </S.HeaderProcessos>
        <S.ContainerCards>
          {allProcess.map((process) => (
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
          
         
        </S.ContainerCards>
        <S.ButtonSeeProcess onClick={() => navigate('/processos')}>Ver todos os processos</S.ButtonSeeProcess>
      </S.ContainerProcessos>
    )
}