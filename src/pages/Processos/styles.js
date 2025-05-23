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
export const Title = styled.h1`
  font-size: 24px;
  margin-left: 16px;
`;

export const WrapperProcess = styled.div`
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

export const HeaderContainerProcess = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  padding: 0 2rem;
`

export const WrapperSearch = styled.div`
  display: flex;
  gap: 1rem;
`

export const InputSearch = styled.input`
  max-width: 40rem;
  width: 40rem;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const SearchButton = styled.button`
  padding: 8px;
  background-color: #454B60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #115293;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #454B60;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #115293;
  }
`;


export const CardsContainer = styled.div`
    width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  margin-top: 2rem;
  gap: 2rem;
  margin-bottom: 4rem;
`;

export const Card = styled.div`
   width: 100%;
  display: flex;
  border-radius: 6px;
  border: 1px solid #ECECEC;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  gap: 0.3rem;
`;

export const SectionValues = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`

export const StatusChip = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AttributeTitle = styled.div`
  font-size: 12px;
  color: #666;
`;

export const AttributeValue = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export const LoaderContainer = styled.div`
  text-align: center;
  margin: 24px 0;
`;

export const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 16px 0;
`;

export const EmptyMessage = styled.div`
  color: #888;
  text-align: center;
  margin: 32px 0;
`;
