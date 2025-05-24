import  { useState } from 'react';
import * as S from './styles'
import { useNavigate } from 'react-router-dom';
import { FiPaperclip } from 'react-icons/fi';


import axios from '../../../utils/axiosConfig'; // Utilize a instância configurada do axios




export function CadastroDocumentos() {
    const [clienteDocs, setClienteDocs] = useState({
      cpf: null,
      rh: null,
    });
    console.log(clienteDocs)
    const [terceirosDocs, setTerceirosDocs] = useState({
      cpf: null,
      rh: null,
    });

    const navigate = useNavigate();

function handleProcessoClick() {
    navigate("/novo-processo");
    }

  function handleFileUpload(e, doc, setDocs, currentDocs) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  setDocs({
    ...currentDocs,
    [doc]: file,
  });

   e.target.value = "";
}



  return (
    <> 
        <S.TitleDocumentType >
          Documentos do Cliente
        </S.TitleDocumentType>
        <S.ContainerInputs >
          {["cpf", "rh"].map((doc, index) => (
            <S.WrapperInput key={index}>
              <label>{doc.toUpperCase()}</label>
              <S.FileUploadContainer>
                  <S.FileUploadIconWrapper>
                    <FiPaperclip size={16} />
                  </S.FileUploadIconWrapper>
                  <S.DescriptionInput>Click to upload files or drag and drop</S.DescriptionInput>
                  <S.FileUploadInput type="file" onChange={(e) => handleFileUpload(e, doc, setClienteDocs, clienteDocs)} />
              </S.FileUploadContainer>
              {clienteDocs[doc] && (
      <p>{clienteDocs[doc].name}</p>
    )}
              
             </S.WrapperInput>
          ))}
        </S.ContainerInputs>

        {/* Documentos de Terceiros */}
        <S.TitleDocumentType>
          Documentos de Terceiros
        </S.TitleDocumentType>
        <S.ContainerInputs >
          {["cpf", "rh"].map((doc, index) => (
            <S.WrapperInput key={index}>
              <label>{doc.toUpperCase()}</label>
              <S.FileUploadContainer>
                <S.FileUploadIconWrapper>
                    <FiPaperclip size={16} />
                  </S.FileUploadIconWrapper>
                  <S.DescriptionInput>Click to upload files or drag and drop</S.DescriptionInput>
                  <S.FileUploadInput type="file" onChange={(e) => handleFileUpload(e, doc, setTerceirosDocs, terceirosDocs)}  />
              </S.FileUploadContainer>

              {terceirosDocs[doc] && (
      <p>{terceirosDocs[doc].name}</p>
    )}
              
              </S.WrapperInput>
          ))}
        </S.ContainerInputs >
        <button> Próximo </button>
    </>
  );
}

