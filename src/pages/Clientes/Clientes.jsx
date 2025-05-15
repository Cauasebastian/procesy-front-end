import { useNavigate } from 'react-router-dom';
import * as S from './styles'
import { Header } from "../../components/Header";
import ButtonBack from '../../assets/btn-back.svg'


export default function Clientes(){
    const navigate = useNavigate();
  return (
    <>
        <Header/>
        <S.ContainerGeral>
          <S.ContainerGoBack>
          <S.ImageArrow src={ButtonBack } />
          <S.TextBack>Clientes</S.TextBack>
        </S.ContainerGoBack>
        
        <S.ContainerClients>
          <S.HeaderClients>
            <S.ContainerSearchClient>
              <S.InputSearch placeholder='Busque pelo nome do cliente ou CPF'/>
              <S.ButtonSearch>Pesquisar</S.ButtonSearch>
            </S.ContainerSearchClient>
            <S.ContainerButtons>
              <S.ButtonNewClient onClick={() => navigate('/cadastro-clientes')}>Novo cliente</S.ButtonNewClient>
            </S.ContainerButtons>
          </S.HeaderClients>
        </S.ContainerClients>
        </S.ContainerGeral>
      </>
        
    )
}