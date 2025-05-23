import styled from "styled-components";
export const DocumentCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  & > span:first-child {
    font-weight: 500;
  }

  & > span:last-child {
    font-size: 0.875rem;
    color: #718096;
  }
`;
//layout
export const ContainerCards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  margin-top: 2rem;
  gap: 2rem;
  margin-bottom: 4rem;
`
export const ContainerProcessos = styled.div`
  display: flex;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 0rem;
  padding-top: 0rem;
  background-color: #ffffff;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 6px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  max-width: calc(100% - 8rem);  /* Calcula a largura total menos a margem de 4rem em ambos os lados */
  margin-left: auto;
  margin-right: auto; /* Centra o container */
  box-sizing: border-box;  /* Garantir que a largura leve em consideração o padding */
`;
// negocio complicado centralizar DIV :(

// LAYOUT   

export const DownloadButton = styled.button`
  background: none;
  border: 1px solid #4a5568;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background: #edf2f7;
  }
`;

export const ContainerGeral = styled.div`
  padding: 0 4rem;  /* Espaçamento interno lateral de 4rem */
  width: 100%;
  margin-top: 3rem;
  overflow-x: hidden;  /* Garantir que não haja rolagem horizontal */
  background-color: #f5f5f5; /* Cor de fundo para garantir que o fundo seja visível */
  box-sizing: border-box;  /* Inclui o padding no cálculo da largura */
  margin-left: 0;  /* Remove qualquer margem à esquerda */
  margin-right: 0; /* Remove qualquer margem à direita */
  position: relative;
  display: flex;
  justify-content: center;
`;



export const ContainerGoBack = styled.div`
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`


export const ImageArrow = styled.img``
export const TextBack = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
`


export const ContainerProcess = styled.div`
  position: relative; 
  width: 100%;
  padding: 3rem;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 0rem;
  border-radius: 6px;
  min-height: 40rem; 
  margin-bottom: 6rem;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`
export const TextHeader = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`

export const ButtonInfoClient = styled.button`
  background-color: rgb(54, 57, 67)
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

export const ContainerInfoProcesso = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 2rem;
`

export const NumberProcess = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`

export const ContainerDocumentos = styled.div`

`

export const TitleContainerDocuments = styled.span`

`

export const SectionDocuments = styled.div`
  
`