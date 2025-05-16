import { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { Header } from "../../components/Header";
import ButtonBack from '../../assets/btn-back.svg';
import { FilterListIcon, PersonAddIcon } from '../../components/Icons/icons.js';

export default function Clientes() {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState('todos');

   const goToMenu = () => {
    navigate('/menu'); 
  };

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <>
      <Header />
      <S.ContainerGeral>
        <S.ContainerGoBack onClick={goToMenu}>
          <S.ImageArrow src={ButtonBack} alt="Voltar" />
          <S.TextBack>Clientes</S.TextBack>
        </S.ContainerGoBack>
        
        <S.ContainerClients>
          <S.HeaderClients>
            <S.ContainerSearchClient>
              <S.InputSearch placeholder='Busque pelo nome do cliente ou CPF' />
              <S.ButtonSearch>Pesquisar</S.ButtonSearch>
            </S.ContainerSearchClient>

            <S.ContainerFilter>
              <S.ButtonFilter onClick={toggleFilter}>
                <FilterListIcon fontSize="small" />
              </S.ButtonFilter>
              
              {showFilter && (
                <S.SelectFilter 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="ativos">Ativos</option>
                  <option value="inativos">Inativos</option>
                </S.SelectFilter>
              )}
            </S.ContainerFilter>

            <S.ContainerButtons>
              <S.ButtonNewClient onClick={() => navigate('/cadastro-clientes')}>
                <PersonAddIcon fontSize="small" style={{ marginRight: '8px' }} />
                Cadastrar Novo Cliente
              </S.ButtonNewClient>
            </S.ContainerButtons>
          </S.HeaderClients>
        </S.ContainerClients>
      </S.ContainerGeral>
    </>
  );
}