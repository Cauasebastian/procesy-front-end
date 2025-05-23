import styled from "styled-components";

export const ContainerCard = styled.div`
  width: 100%;
  display: flex;
  border-radius: 6px;
  border: 1px solid #ECECEC;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`

export const StatusProcessContainer = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  gap: 0.3rem;
`

export const TextProcessStatus = styled.span`
  color: ${({ color }) => color};
  font-weight: 500;
`

export const BallStatusProcess = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({bgColor}) => bgColor};
`;

export const SectionValues = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`

export const LabelField = styled.span`
  color:#959595;
`

export const ValueField = styled.span`

`
export const ButtonMoreInfo = styled.button`
  color: #FFF;
  background-color: #454B60;
`