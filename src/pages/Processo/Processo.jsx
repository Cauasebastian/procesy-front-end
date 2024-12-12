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
    IconButton, 
    CircularProgress, 
    Alert 
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import axios from '../../utils/axiosConfig'; // Utilize a instância configurada do axios

export default function Processo() {
    const { processoId } = useParams(); // Obter o processoId da URL
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

    // Função para determinar a cor do status dinamicamente
    const getStatusColor = (status) => {
        if (!status) return '#6c757d'; // Cinza padrão para status indefinidos
        switch(status.toLowerCase()) {
            case 'concluído':
                return '#28a745'; // Verde
            case 'em andamento':
                return '#ffc107'; // Amarelo
            case 'pendente':
                return '#dc3545'; // Vermelho
            default:
                return '#6c757d'; // Cinza
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

    if (error) {
        return (
            <Box 
                sx={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh'
                }}
            >
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100vw",
                minHeight: "100vh",
                background: "#ffffff", // Fundo branco
                paddingTop: "30px",
                paddingX: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    backgroundColor: "#ffffff", // Fundo branco
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e0e0e0",
                }}
            >
                {/* Cabeçalho com o título e o botão de voltar */}
                <PageBack
                    title="Detalhes do Processo"
                    onBack={() => navigate(-1)} // Volta para a página anterior
                    sx={{
                        color: "#000000", // Texto preto
                        fontWeight: "bold",
                    }}
                />

                {/* Detalhes do processo */}
                <Typography
                    variant="h5"
                    sx={{
                        marginY: 2,
                        fontWeight: "bold",
                        color: "#000000", // Texto preto
                        textAlign: "center",
                    }}
                >
                    Número: {processo?.numeroProcesso || "Não especificado"}
                </Typography>

                <Divider sx={{ marginY: 3, borderColor: "#d3d3d3" }} />

                {/* Seção de Documentos e Status */}
                <Card
                    sx={{
                        width: "100%",
                        backgroundColor: "#ffffff", // Fundo branco
                        borderRadius: 4,
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: 3,
                        marginBottom: 4,
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#000000", // Texto preto
                                marginBottom: 2,
                            }}
                        >
                            Documentos e Status
                        </Typography>

                        {/* Status Contrato */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    marginBottom: 1, 
                                    fontSize: '16px', 
                                    fontWeight: 'normal',
                                }}
                            >
                                Status Contrato
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: getStatusColor(processo?.statusContrato),
                                    fontSize: '14px'
                                }}
                            >
                                {processo?.statusContrato || "Não especificado"}
                            </Typography>
                        </Box>

                        {/* Status Procurações */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    marginBottom: 1, 
                                    fontSize: '16px', 
                                    fontWeight: 'normal',
                                }}
                            >
                                Status Procurações
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: getStatusColor(processo?.statusProcuracoes),
                                    fontSize: '14px'
                                }}
                            >
                                {processo?.statusProcuracoes || "Não especificado"}
                            </Typography>
                        </Box>

                        {/* Status Petições Iniciais */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    marginBottom: 1, 
                                    fontSize: '16px', 
                                    fontWeight: 'normal',
                                }}
                            >
                                Status Petições Iniciais
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: getStatusColor(processo?.statusPeticoesIniciais),
                                    fontSize: '14px'
                                }}
                            >
                                {processo?.statusPeticoesIniciais || "Não especificado"}
                            </Typography>
                        </Box>

                        {/* Status Documentos Complementares */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    marginBottom: 1, 
                                    fontSize: '16px', 
                                    fontWeight: 'normal',
                                }}
                            >
                                Status Documentos Complementares
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: getStatusColor(processo?.statusDocumentosComplementares),
                                    fontSize: '14px'
                                }}
                            >
                                {processo?.statusDocumentosComplementares || "Não especificado"}
                            </Typography>
                        </Box>

                        {/* Lista de Procurações */}
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Procurações
                        </Typography>
                        {processo?.procuracoes && processo.procuracoes.length > 0 ? (
                            <List>
                                {processo.procuracoes.map((proc) => (
                                    <ListItem
                                        key={proc.id}
                                        secondaryAction={
                                            <IconButton 
                                                edge="end" 
                                                aria-label="download" 
                                                onClick={() => handleDownload('procuracao', proc.id, proc.nomeArquivo, proc.tipoArquivo)}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        }
                                    >
                                        {proc.nomeArquivo} ({proc.tipoArquivo})
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" sx={{ color: "#000000" }}>
                                Nenhuma procuração adicionada.
                            </Typography>
                        )}

                        {/* Lista de Petições Iniciais */}
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Petições Iniciais
                        </Typography>
                        {processo?.peticoesIniciais && processo.peticoesIniciais.length > 0 ? (
                            <List>
                                {processo.peticoesIniciais.map((pet) => (
                                    <ListItem
                                        key={pet.id}
                                        secondaryAction={
                                            <IconButton 
                                                edge="end" 
                                                aria-label="download" 
                                                onClick={() => handleDownload('peticao-inicial', pet.id, pet.nomeArquivo, pet.tipoArquivo)}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        }
                                    >
                                        {pet.nomeArquivo} ({pet.tipoArquivo})
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" sx={{ color: "#000000" }}>
                                Nenhuma petição inicial adicionada.
                            </Typography>
                        )}

                        {/* Lista de Documentos Complementares */}
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Documentos Complementares
                        </Typography>
                        {processo?.documentosComplementares && processo.documentosComplementares.length > 0 ? (
                            <List>
                                {processo.documentosComplementares.map((doc) => (
                                    <ListItem
                                        key={doc.id}
                                        secondaryAction={
                                            <IconButton 
                                                edge="end" 
                                                aria-label="download" 
                                                onClick={() => handleDownload('documento-complementar', doc.id, doc.nomeArquivo, doc.tipoArquivo)}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        }
                                    >
                                        {doc.nomeArquivo} ({doc.tipoArquivo})
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" sx={{ color: "#000000" }}>
                                Nenhum documento complementar adicionado.
                            </Typography>
                        )}

                        {/* Lista de Contratos */}
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Contratos
                        </Typography>
                        {processo?.contratos && processo.contratos.length > 0 ? (
                            <List>
                                {processo.contratos.map((contrato) => (
                                    <ListItem
                                        key={contrato.id}
                                        secondaryAction={
                                            <IconButton 
                                                edge="end" 
                                                aria-label="download" 
                                                onClick={() => handleDownload('contrato', contrato.id, contrato.nomeArquivo, contrato.tipoArquivo)}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        }
                                    >
                                        {contrato.nomeArquivo} ({contrato.tipoArquivo})
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" sx={{ color: "#000000" }}>
                                Nenhum contrato adicionado.
                            </Typography>
                        )}
                    </CardContent>
                </Card>

                {/* Seção de Upload de Documentos */}
                <Card
                    sx={{
                        width: "100%",
                        backgroundColor: "#ffffff", // Fundo branco
                        borderRadius: 4,
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: 3,
                        marginBottom: 4,
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#000000", // Texto preto
                                marginBottom: 2,
                            }}
                        >
                            Upload de Documentos
                        </Typography>

                        {/* Upload de Procurações */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                                Procurações
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    backgroundColor: "#4a90e2", // Azul estilizado
                                    color: "#ffffff", // Texto branco
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    paddingY: 1,
                                    paddingX: 3,
                                    borderRadius: 3,
                                    "&:hover": {
                                        backgroundColor: "#357ABD", // Azul mais escuro no hover
                                    },
                                }}
                            >
                                Escolher arquivo
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={(e) => handleFileSelect('procuracoes', e)}
                                />
                            </Button>
                            <List>
                                {procuracoesFiles.map((file, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            color: "#000000",
                                        }}
                                    >
                                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveFile("procuracoes", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Upload de Petições Iniciais */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                                Petições Iniciais
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    backgroundColor: "#4a90e2", // Azul estilizado
                                    color: "#ffffff", // Texto branco
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    paddingY: 1,
                                    paddingX: 3,
                                    borderRadius: 3,
                                    "&:hover": {
                                        backgroundColor: "#357ABD", // Azul mais escuro no hover
                                    },
                                }}
                            >
                                Escolher arquivo
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={(e) => handleFileSelect('peticoesIniciais', e)}
                                />
                            </Button>
                            <List>
                                {peticoesIniciaisFiles.map((file, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            color: "#000000",
                                        }}
                                    >
                                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveFile("peticoesIniciais", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Upload de Documentos Complementares */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                                Documentos Complementares
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    backgroundColor: "#4a90e2", // Azul estilizado
                                    color: "#ffffff", // Texto branco
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    paddingY: 1,
                                    paddingX: 3,
                                    borderRadius: 3,
                                    "&:hover": {
                                        backgroundColor: "#357ABD", // Azul mais escuro no hover
                                    },
                                }}
                            >
                                Escolher arquivo
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={(e) => handleFileSelect('documentosComplementares', e)}
                                />
                            </Button>
                            <List>
                                {documentosComplementaresFiles.map((file, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            color: "#000000",
                                        }}
                                    >
                                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveFile("documentosComplementares", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Upload de Contratos */}
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                                Contratos
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    backgroundColor: "#4a90e2", // Azul estilizado
                                    color: "#ffffff", // Texto branco
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    paddingY: 1,
                                    paddingX: 3,
                                    borderRadius: 3,
                                    "&:hover": {
                                        backgroundColor: "#357ABD", // Azul mais escuro no hover
                                    },
                                }}
                            >
                                Escolher arquivo
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={(e) => handleFileSelect('contratos', e)}
                                />
                            </Button>
                            <List>
                                {contratosFiles.map((file, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            color: "#000000",
                                        }}
                                    >
                                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveFile("contratos", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Botão para Enviar Arquivos */}
                        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                            {uploadError && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {uploadError}
                                </Alert>
                            )}
                            {uploadSuccess && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    {uploadSuccess}
                                </Alert>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFileUpload}
                                disabled={
                                    (procuracoesFiles.length === 0 &&
                                    peticoesIniciaisFiles.length === 0 &&
                                    documentosComplementaresFiles.length === 0 &&
                                    contratosFiles.length === 0) ||
                                    uploading
                                }
                                sx={{
                                    backgroundColor: "#28a745", // Verde
                                    color: "#ffffff",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    paddingY: 1,
                                    paddingX: 4,
                                    borderRadius: 3,
                                    "&:hover": {
                                        backgroundColor: "#218838", // Verde mais escuro no hover
                                    },
                                }}
                            >
                                {uploading ? "Enviando..." : "Enviar Arquivos"}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}