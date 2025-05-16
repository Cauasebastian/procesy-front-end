import styled from "styled-components";

export const ContainerGeral = styled.div`
  padding: 0 4rem;
  width: 100%;
  margin-top: 3rem;
  overflow-x: hidden;
  
    @media (max-width: 768px) {
    padding: 0 1rem;
    margin-top: 1.5rem;
  }
`;

export const ContainerGoBack = styled.div`
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

    &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.25rem 0;
  }
`;

export const ImageArrow = styled.img`
  width: 24px;
  height: 24px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(-2px);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export const TextBack = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #454B60;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ContainerClients = styled.div`
  position: relative; 
  width: 100%;
  padding: 3rem;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 3rem;
  border-radius: 6px;
  min-height: 40rem; 
  margin-bottom: 6rem;

    @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 1.5rem;
    min-height: 25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;

export const HeaderClients = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: 1rem 0;
  margin-bottom: 2rem;
  gap: 1rem;

    @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const ContainerSearchClient = styled.div`
  display: flex;
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

export const InputSearch = styled.input`
  outline: none;
  border: 1px solid rgb(175, 175, 175);
  padding: 0.8rem;
  border-radius: 6px 0 0 6px;
  width: 100%;
  min-width: 38rem;
  border-right: none;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    padding: 0.7rem;
  }
`

export const ButtonSearch = styled.button`
  padding: 0 1.5rem;
  border-radius: 0 6px 6px 0;
   background-color: #454B60;
  color: #FFF;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`

export const ContainerButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
  flex-shrink: 0;
  min-width: max-content;

   @media (max-width: 1024px) {
    flex-shrink: 1; /* Permite encolher gradualmente */
  }

   @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    margin-left: 0;
  }
`;

export const ButtonNewClient = styled.button`
  background-color: #454B60;
  color: #FFF;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Espaço entre ícone e texto */
  flex-shrink: 1;  
  white-space: nowrap;
  font-size: clamp(0.875rem, 1.5vw, 1rem);

  &:hover {
    background-color: #383d4f;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    width: auto;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 1rem;
    width: 100%;
    justify-content: center;
  }
`;

// FilterListIcon
export const ContainerFilter = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    order: -1;
    align-self: flex-end;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const ButtonFilter = styled.button`
  background-color: #454B60;
  color: #FFF;
  padding: 1rem 2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem; /* Espaço entre ícone e texto */
  transition: all 0.2s;
  min-width: max-content;
  font-size: 1rem;

  &:hover {
    background-color: #383d4f;
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SelectFilter = styled.select`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  z-index: 10;
  min-width: 120px;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    right: auto;
    left: 0;
    min-width: 100%;
  }
`;