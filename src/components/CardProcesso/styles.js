import styled from "styled-components";

export const ContainerCard = styled.div`
  width: 100%;
  display: flex;
  border-radius: 6px;
  border: 1px solid #ECECEC;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`;

export const StatusProcessContainer = styled.div`
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  gap: 0.3rem;
`;

export const LoadingText = styled.span`
  color: #6c757d;
  font-style: italic;
`;

export const ErrorText = styled.span`
  color: #dc3545;
  font-size: 0.9em;
`;

export const PrevisaoValue = styled.span`
  font-weight: 600;
  color: ${props => {
    if (props.$dias < 5) return '#28a745';
    if (props.$dias < 15) return '#ffc107';
    return '#dc3545';
  }};
`;

export const TextProcessStatus = styled.span`
  color: ${({ $color }) => $color};
  font-weight: 500;
`;

export const BallStatusProcess = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor};
`;

export const SectionValues = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

export const LabelField = styled.span`
  color: #959595;
`;

export const ValueField = styled.span``;

export const ButtonMoreInfo = styled.button`
  color: #FFF;
  background-color: #454B60;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #363b4d;
  }
`;

// Componentes adicionados para resolver o erro
export const DocumentStatusContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.3rem;
`;

export const CompletedBadge = styled.span`
  background-color: #D4EDDA;
  color: #155724;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

export const PendingBadge = styled.span`
  background-color: #F8D7DA;
  color: #721C24;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;