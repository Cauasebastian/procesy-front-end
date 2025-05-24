import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 4rem;
  width: 100%;
  margin-top: 3rem;
  overflow-y: hidden;
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

export const FormWrapper = styled.div`
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

export const HeaderContainerMessage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const TextHeader = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`

export const TabBar = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  margin-bottom: 1rem;
  margin-top: 3rem;
  width: 100%;
  border: 1px solid #ccc;
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
  border-bottom: ${props => (props.active ? '3px solid #3F4E7A' : '')};
  background: none;
  border-radius: 0;
  color: ${props => (props.active ? '#3F4E7A' : '#888')};
  cursor: pointer;
  width: 100%;
`;
