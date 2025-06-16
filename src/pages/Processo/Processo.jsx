// src/pages/Processo/Processo.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageBack } from "../../components/PageBack";
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    Divider, 
    List, 
    ListItem, 
    ListItemText,
    IconButton, 
    CircularProgress, 
    Alert 
} from "@mui/material";

import * as S from './styles';
import DocumentosStatus from "../../components/DocumentStatus";
import FileUploadSection from "../../components/FileUploadSection";
import { toast, ToastContainer } from "react-toastify";
import { Header } from '../../components/Header';

import { CardProcesso } from "../../components/CardProcesso";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import axios from '../../utils/axiosConfig';

export default function Processo () {
    const { processoId } = useParams();
    const navigate = useNavigate();
    const [processo, setProcesso] = useState(null);
    const [processoData, setProcessoData] = useState(null);
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
            try {
                const response = await axios.get(`/advogado/processos/${processoId}`);
                setProcessoData(response.data);
            } catch (err) {
                console.error('Erro ao obter detalhes do processo:', err);
                setError(err.response?.data?.mensagem || err.message || 'Erro ao obter detalhes do processo.');
            }
            try {
                const response = await axios.get(`/api/documento-processo/processo/${processoId}`);
                setProcesso(response.data);
            } catch (err) {
                console.error('Erro ao obter detalhes do processo:', err);
                setError(err.response?.data?.mensagem || err.message || 'Erro ao obter detalhes do processo.');
            } finally {
                setLoading(false);
            }
        };

        if (processoId) {
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

            const token = localStorage.getItem('token');
            const response = await axios.post(`/api/documento-processo/upload/${processoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setUploadSuccess('Arquivos enviados com sucesso.');
            toast.success('Arquivos enviados com sucesso.')
            
            const updatedProcesso = await axios.get(`/api/documento-processo/processo/${processoId}`);
            setProcesso(updatedProcesso.data);
            
            setProcuracoesFiles([]);
            setPeticoesIniciaisFiles([]);
            setDocumentosComplementaresFiles([]);
            setContratosFiles([]);
        } catch (err) {
            console.error('Erro ao enviar arquivos:', err);
            setUploadError(err.response?.data?.mensagem || err.message || 'Erro ao enviar arquivos.');
            toast.error('Erro ao enviar arquivos.')
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

    const handleFileSelect = (type, event) => {
        const files = Array.from(event.target.files);
        switch(type) {
            case 'procuracoes':
                setProcuracoesFiles(prev => [...prev, ...files]);
                break;
            case 'peticoesIniciais':
                setPeticoesIniciaisFiles(prev => [...prev, ...files]);
                break;
            case 'documentosComplementares':
                setDocumentosComplementaresFiles(prev => [...prev, ...files]);
                break;
            case 'contratos':
                setContratosFiles(prev => [...prev, ...files]);
                break;
            default:
                break;
        }
    };
    
    const isAnyFileSelected = (
        procuracoesFiles.length > 0 || 
        peticoesIniciaisFiles.length > 0 || 
        documentosComplementaresFiles.length > 0 || 
        contratosFiles.length > 0
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <>
            <Header />
            <PageBack
                title="Detalhes do Processo"
                onBack={() => navigate(-1)}
            />

            <S.ContainerProcessos>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                
                <S.HeaderContainer>
                    <S.TextHeader>{processoData?.cliente.nome || "Nome do Cliente"}</S.TextHeader>
                    <S.ButtonInfoClient>Informações do Cliente</S.ButtonInfoClient>
                </S.HeaderContainer>
                
                <S.ContainerCards>
                    <Typography variant="h5" sx={{ marginY: 2, fontWeight: "bold", color: "#000000", textAlign: "left" }}>
                        Número: {processoData?.numeroProcesso || "Não especificado"}
                    </Typography>
                    
                    <CardProcesso processo={processoData} />
                    
                    {/* DocumentosStatus com handleDownload implementado */}
                    <DocumentosStatus 
                        processo={processo} 
                        handleDownload={handleDownload} 
                    />

                    {/* Seção de Upload de Documentos */}
                    <Card sx={{ width: "100%", backgroundColor: "#ffffff", borderRadius: 4, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", padding: 3, marginBottom: 4 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000000", marginBottom: 2 }}>
                                Upload de Documentos
                            </Typography>

                            <FileUploadSection
                                title="Procurações"
                                files={procuracoesFiles}
                                handleFileSelect={handleFileSelect}
                                handleRemoveFile={handleRemoveFile}
                                fileType="procuracoes"
                            />
                            
                            <FileUploadSection
                                title="Petições Iniciais"
                                files={peticoesIniciaisFiles}
                                handleFileSelect={handleFileSelect}
                                handleRemoveFile={handleRemoveFile}
                                fileType="peticoesIniciais"
                            />
                            
                            <FileUploadSection
                                title="Documentos Complementares"
                                files={documentosComplementaresFiles}
                                handleFileSelect={handleFileSelect}
                                handleRemoveFile={handleRemoveFile}
                                fileType="documentosComplementares"
                            />
                            
                            <FileUploadSection
                                title="Contratos"
                                files={contratosFiles}
                                handleFileSelect={handleFileSelect}
                                handleRemoveFile={handleRemoveFile}
                                fileType="contratos"
                            />
                            
                            {isAnyFileSelected && (
                                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                                    {uploadError && <Alert severity="error" sx={{ mb: 2 }}>{uploadError}</Alert>}
                                    {uploadSuccess && <Alert severity="success" sx={{ mb: 2 }}>{uploadSuccess}</Alert>}
                                    
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleFileUpload}
                                        disabled={uploading}
                                        startIcon={<CloudUploadIcon />}
                                        sx={{
                                            backgroundColor: "#4a90e2",
                                            color: "#ffffff",
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            paddingY: 1,
                                            paddingX: 3,
                                            borderRadius: 3,
                                            "&:hover": { backgroundColor: "#357ABD" },
                                        }}
                                    >
                                        {uploading ? "Enviando..." : "Enviar Todos os Arquivos"}
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </S.ContainerCards>
            </S.ContainerProcessos>
        </>
    );
}