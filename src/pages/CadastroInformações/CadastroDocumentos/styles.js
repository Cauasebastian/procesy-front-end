import styled from 'styled-components';

export const TitleDocumentType = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export const ContainerInputs = styled.div`
    display: flex;
    width: 60%;
    gap: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`

export const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const FileUploadContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px dashed #d1d5db;
  background-color: #fafafd;
  padding: 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: #6b7280;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const DescriptionInput = styled.span`
    color: #7D8597;
    font-size: 1rem;
`

export const FileUploadInput = styled.input`
  display: none;
`;

export const FileUploadIconWrapper = styled.div`
  background-color: #f1f2f6;
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
