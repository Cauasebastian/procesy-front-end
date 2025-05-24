import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 4rem;
  width: 100%;
  margin-top: 3rem;
  overflow-x: hidden;
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
`

export const Input = styled.input`
  flex: 1;
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
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #454B60;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #115293;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 20px;
  color: #555;

  &:hover {
    color: #000;
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

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
