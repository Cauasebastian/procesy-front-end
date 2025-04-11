
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import axios from '../../utils/axiosConfig'; // Utilize a instância configurada do axios
import { api } from "../../lib/axios";
import { Header } from "../../components/Header";
import * as S from './styles'
import ButtonBack from '../../assets/btn-back.svg'

export default function Processo() {
  const { processoId } = useParams();
  console.log(processoId)
    const navigate = useNavigate();
    const [processo, setProcesso] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados para armazenar os arquivos a serem enviados
    const [procuracoesFiles, setProcuracoesFiles] = useState([]);
    const [peticoesIniciaisFiles, setPeticoesIniciaisFiles] = useState([]);
    const [documentosComplementaresFiles, setDocumentosComplementaresFiles] = useState([]);
    const [contratosFiles, setContratosFiles] = useState([]);

    // Estados para indicar o upload em andamento
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);

    useEffect(() => {
        const fetchProcessoDetails = async () => {
            setLoading(true);
          setError(null);
        const token = localStorage.getItem("token")
            try {
                const response = await api.get(`/advogado/processos/${processoId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
              setProcesso(response.data);
              console.log(processo)
            } catch (err) {
                console.error('Erro ao obter detalhes do processo:', err);
                setError(err.response?.data?.mensagem || err.message || 'Erro ao obter detalhes do processo.');
            } finally {
                setLoading(false);
            }
        };

        if (processoId) { // Verifique se processoId está definido
            fetchProcessoDetails();
        } else {
            setError('ID do processo não fornecido.');
            setLoading(false);
        }
    }, [processoId]);

    const handleFileUpload = async () => {
        setUploading(true);
        setUploadError(null);
        setUploadSuccess(null);
        try {
            const formData = new FormData();
            procuracoesFiles.forEach(file => formData.append('procuracoes', file));
            peticoesIniciaisFiles.forEach(file => formData.append('peticoesIniciais', file));
            documentosComplementaresFiles.forEach(file => formData.append('documentosComplementares', file));
            contratosFiles.forEach(file => formData.append('contratos', file));

            const token = localStorage.getItem('token'); // Obtém o token de autenticação
            const response = await axios.post(`/api/documento-processo/upload/${processoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Adicione se necessário
                },
            });

            setUploadSuccess('Arquivos enviados com sucesso.');
            // Atualizar os detalhes do processo após upload
            const updatedProcesso = await axios.get(`/api/documento-processo/processo/${processoId}`);
            setProcesso(updatedProcesso.data);
            // Limpar os arquivos selecionados
            setProcuracoesFiles([]);
            setPeticoesIniciaisFiles([]);
            setDocumentosComplementaresFiles([]);
            setContratosFiles([]);
        } catch (err) {
            console.error('Erro ao enviar arquivos:', err);
            setUploadError(err.response?.data?.mensagem || err.message || 'Erro ao enviar arquivos.');
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async (type, id, nomeArquivo, tipoArquivo) => {
        try {
            let endpoint = "";
            switch(type) {
                case 'procuracao':
                    endpoint = `/api/documento-processo/procuracao/${id}`;
                    break;
                case 'peticao-inicial':
                    endpoint = `/api/documento-processo/peticao-inicial/${id}`;
                    break;
                case 'documento-complementar':
                    endpoint = `/api/documento-processo/documento-complementar/${id}`;
                    break;
                case 'contrato':
                    endpoint = `/api/documento-processo/contrato/${id}`;
                    break;
                default:
                    return;
            }

            const response = await axios.get(endpoint, {
                responseType: 'blob', // Importante para baixar arquivos
            });

            // Criar um link temporário para download
            const url = window.URL.createObjectURL(new Blob([response.data], { type: tipoArquivo }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nomeArquivo); // Nome do arquivo para download
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error(`Erro ao baixar o arquivo ${nomeArquivo}:`, err);
            alert(`Erro ao baixar o arquivo ${nomeArquivo}.`);
        }
    };

    const handleRemoveFile = (type, index) => {
        switch(type) {
            case 'procuracoes':
                setProcuracoesFiles(prev => prev.filter((_, i) => i !== index));
                break;
            case 'peticoesIniciais':
                setPeticoesIniciaisFiles(prev => prev.filter((_, i) => i !== index));
                break;
            case 'documentosComplementares':
                setDocumentosComplementaresFiles(prev => prev.filter((_, i) => i !== index));
                break;
            case 'contratos':
                setContratosFiles(prev => prev.filter((_, i) => i !== index));
                break;
            default:
                break;
        }
    };


    if (loading) {
        return (
            <Box 
                sx={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }


  return (
    <>
      <Header />
      <S.ContainerGeral>
        <S.ContainerGoBack onClick={() => navigate(-1)}>
          <S.ImageArrow src={ButtonBack} />
          <S.TextBack>Detalhes do processo</S.TextBack>
        </S.ContainerGoBack>
        <S.ContainerProcess>
          <S.HeaderContainer>
            <S.TextHeader>{processo?.cliente?.nome}</S.TextHeader>
            <S.ButtonInfoClient>Informações do cliente</S.ButtonInfoClient>
          </S.HeaderContainer>
        </S.ContainerProcess>
      </S.ContainerGeral>
    </>
    );
}