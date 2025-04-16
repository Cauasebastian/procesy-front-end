import styled from "styled-components";

export const ContainerGeral = styled.div`
  padding: 0 4rem;
  width: 100%;
  margin-top: 3rem;
  overflow-x: hidden;
  
`

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
  margin-top: 3rem;
  border-radius: 6px;
  min-height: 40rem; 
  margin-bottom: 6rem;
`;

export const HeaderProcessos = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  margin-bottom: 2rem;
`

export const ContainerSearchProcess = styled.div`
  
`

export const InputSearch = styled.input`
  outline: none;
  border: 1px solid rgb(175, 175, 175);
  padding: 0.9rem;
  border-radius: 6px 0 0 6px;
  min-width: 38rem;
  border-right: none;
`

export const ButtonSearch = styled.button`
  padding: 0.95rem 2rem;
  border-radius: 0 6px 6px 0;
   background-color: #454B60;
  color: #FFF;
  border-left: none;
`

export const ContainerButtons = styled.div`
  display: flex;
  gap: 1rem;
  
`

export const ButtonNewProcess = styled.button`
  background-color: #454B60;
  color: #FFF;
  padding: 0.6rem 2rem;
`

export const ButtonNewClient = styled.button`
  background-color: #454B60;
  color: #FFF;
  padding: 0.6rem 2rem;
`