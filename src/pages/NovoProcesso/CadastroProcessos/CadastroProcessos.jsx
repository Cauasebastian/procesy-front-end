import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { Header } from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import { PageBack } from '../../../components/PageBack';
import axios from '../../../utils/axiosConfig'; // Utilize a instância configurada do axios

function CadastroProcessos() {
  // Estado para os dados do processo
  const [processoInfo, setProcessoInfo] = useState({
    numeroProcesso: '',
    tipoProcesso: '',
    tipoAtendimento: '',
    dataInicio: '',
    dataAtualizacao: '',
    status: 'Em Andamento',
  });

  // Estado para os status dos documentos
  const [documentoStatus, setDocumentoStatus] = useState({
    contratos: 'Em Andamento', // Alterado de 'contrato' para 'contratos'
    procuracoes: 'Em Andamento',
    peticoesIniciais: 'Em Andamento',
    documentosComplementares: 'Em Andamento',
  });

  // Estado para os arquivos de cada tipo de documento
  const [uploadedFiles, setUploadedFiles] = useState({
    contratos: [], // Alterado de 'contrato' para 'contratos'
    procuracoes: [],
    peticoesIniciais: [],
    documentosComplementares: [],
  });

  // Estados de feedback
  const [loading, setLoading] = useState(false); // Estado de carregamento para processo
  const [documentUploadLoading, setDocumentUploadLoading] = useState(false); // Estado de carregamento para upload de documentos
  const [documentUploadError, setDocumentUploadError] = useState('');
  const [documentUploadSuccess, setDocumentUploadSuccess] = useState('');
  const [incompleteProcessId, setIncompleteProcessId] = useState(null);

  const navigate = useNavigate();

  // Função para lidar com mudanças nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProcessoInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com mudanças no status dos documentos
  const handleDocumentStatusChange = (e, docType) => {
    const { value } = e.target;
    setDocumentoStatus((prevStatus) => ({
      ...prevStatus,
      [docType]: value,
    }));
  };

  // Função para lidar com o upload de arquivos
  const handleFileUpload = (e, docType) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => ({
      ...prevFiles,
      [docType]: files,
    }));
  };

  // Função para validar os campos do formulário
  const validateFields = () => {
    if (!processoInfo.numeroProcesso) {
      alert('Número do Processo é obrigatório.');
      return false;
    }
    if (!processoInfo.tipoProcesso) {
      alert('Tipo de Processo é obrigatório.');
      return false;
    }
    if (!processoInfo.tipoAtendimento) {
      alert('Tipo de Atendimento é obrigatório.');
      return false;
    }
    if (!processoInfo.dataInicio) {
      alert('Data de Início é obrigatória.');
      return false;
    }
    if (!processoInfo.dataAtualizacao) {
      alert('Data de Atualização é obrigatória.');
      return false;
    }
    if (!processoInfo.status) {
      alert('Status do Processo é obrigatório.');
      return false;
    }
    // Verifica se todos os documentos têm status selecionado
    for (const docType in documentoStatus) {
      if (!documentoStatus[docType]) {
        alert(`Status do documento "${docType}" é obrigatório.`);
        return false;
      }
    }
    return true;
  };

  // Função para enviar os dados do processo
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (incompleteProcessId) {
      alert('Há um processo incompleto. Por favor, complete o upload dos documentos antes de criar um novo processo.');
      return;
    }

    if (!validateFields()) {
      return;
    }

    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const clienteId = localStorage.getItem('clienteId'); // Obtém o clienteId do localStorage

    if (!token) {
      alert('Autenticação necessária!');
      navigate('/login'); // Redireciona para a página de login
      return;
    }

    if (!clienteId) {
      alert('Cliente não identificado. Por favor, cadastre um cliente primeiro.');
      navigate('/cadastro-clientes'); // Redireciona para cadastro de clientes
      return;
    }

    // Formate as datas para ISO8601
    const formattedDataInicio = new Date(processoInfo.dataInicio).toISOString();
    const formattedDataAtualizacao = new Date(processoInfo.dataAtualizacao).toISOString();

    // Preparar o payload para o ProcessoDTO
    const processoPayload = {
      numeroProcesso: processoInfo.numeroProcesso,
      tipoProcesso: processoInfo.tipoProcesso,
      tipoAtendimento: processoInfo.tipoAtendimento,
      dataInicio: formattedDataInicio,
      dataAtualizacao: formattedDataAtualizacao,
      status: processoInfo.status,
      // Status dos documentos
      statusContrato: documentoStatus.contratos, // Atualizado para 'contratos'
      statusProcuracoes: documentoStatus.procuracoes,
      statusPeticoesIniciais: documentoStatus.peticoesIniciais,
      statusDocumentosComplementares: documentoStatus.documentosComplementares,
    };

    setLoading(true); // Inicia o estado de carregamento

    try {
      // Enviar o ProcessoDTO para criar o processo
      const response = await axios.post(
        `/advogado/processos?clienteId=${clienteId}`,
        processoPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      alert('Processo cadastrado com sucesso!');

      const novoProcessoId = response.data.id;
      console.log('Processo criado com ID:', novoProcessoId);

      // Tenta enviar os documentos
      const uploadSuccess = await uploadDocuments(novoProcessoId, token);

      if (uploadSuccess) {
        alert('Processo e documentos cadastrados com sucesso!');
        // Resetar os estados
        setProcessoInfo({
          numeroProcesso: '',
          tipoProcesso: '',
          tipoAtendimento: '',
          dataInicio: '',
          dataAtualizacao: '',
          status: 'Em Andamento',
        });
        setDocumentoStatus({
          contratos: 'Em Andamento', // Atualizado para 'contratos'
          procuracoes: 'Em Andamento',
          peticoesIniciais: 'Em Andamento',
          documentosComplementares: 'Em Andamento',
        });
        setUploadedFiles({
          contratos: [], // Atualizado para 'contratos'
          procuracoes: [],
          peticoesIniciais: [],
          documentosComplementares: [],
        });
        navigate('/'); // Redireciona para a página inicial ou outra página
      } else {
        // Upload de documentos falhou, marca o processo como incompleto
        setIncompleteProcessId(novoProcessoId);
      }

    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status diferente de 2xx
        console.error('Erro ao cadastrar processo:', error.response.data);
        alert(`Erro ao cadastrar processo: ${error.response.data.mensagem || error.message}`);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error('Erro ao cadastrar processo: Nenhuma resposta do servidor', error.request);
        alert('Erro ao cadastrar processo: Nenhuma resposta do servidor.');
      } else {
        // Algo aconteceu na configuração da requisição
        console.error('Erro ao cadastrar processo:', error.message);
        alert(`Erro ao cadastrar processo: ${error.message}`);
      }
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  // Função para fazer o upload dos documentos
  const uploadDocuments = async (processoId, token) => {
    setDocumentUploadLoading(true);
    setDocumentUploadError('');
    setDocumentUploadSuccess('');

    const formData = new FormData();
    // Adiciona os arquivos de cada tipo de documento
    for (const docType in uploadedFiles) {
      uploadedFiles[docType].forEach(file => {
        formData.append(docType, file);
      });
    }

    try {
      const response = await axios.post(`/api/documento-processo/upload/${processoId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('Documentos enviados com sucesso:', response.data);
      setDocumentUploadSuccess('Documentos enviados com sucesso.');
      return true;

    } catch (error) {
      console.error('Erro ao enviar documentos:', error);
      setDocumentUploadError(
        error.response?.data?.mensagem || 'Erro ao enviar documentos. Por favor, tente novamente.'
      );
      return false;
    } finally {
      setDocumentUploadLoading(false);
    }
  };

  // Função para tentar enviar documentos novamente
  const retryUploadDocuments = async () => {
    if (!incompleteProcessId) {
      alert('Nenhum processo incompleto para enviar documentos.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Autenticação necessária!');
      navigate('/login'); // Redireciona para a página de login
      return;
    }

    setDocumentUploadError('');
    setDocumentUploadSuccess('');

    setDocumentUploadLoading(true);

    try {
      const uploadSuccess = await uploadDocuments(incompleteProcessId, token);

      if (uploadSuccess) {
        alert('Documentos enviados com sucesso!');
        setIncompleteProcessId(null);
        setProcessoInfo({
          numeroProcesso: '',
          tipoProcesso: '',
          tipoAtendimento: '',
          dataInicio: '',
          dataAtualizacao: '',
          status: 'Em Andamento',
        });
        setDocumentoStatus({
          contratos: 'Em Andamento', // Atualizado para 'contratos'
          procuracoes: 'Em Andamento',
          peticoesIniciais: 'Em Andamento',
          documentosComplementares: 'Em Andamento',
        });
        setUploadedFiles({
          contratos: [], // Atualizado para 'contratos'
          procuracoes: [],
          peticoesIniciais: [],
          documentosComplementares: [],
        });
        navigate('/'); // Redireciona para a página inicial ou outra página
      } else {
        // Upload de documentos ainda falhou
        alert('Falha ao enviar documentos. Por favor, tente novamente.');
      }

    } catch (error) {
      console.error('Erro ao tentar enviar documentos novamente:', error);
      setDocumentUploadError(
        error.response?.data?.mensagem || 'Erro ao enviar documentos. Por favor, tente novamente.'
      );
    } finally {
      setDocumentUploadLoading(false);
    }
  };

  // Função para renderizar a lista de arquivos
  const renderFileList = (docType) => {
    return (
      <List dense>
        {uploadedFiles[docType].map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <Header customStyles={{ padding: '1rem 3rem' }} />
      <PageBack title="Voltar para Cliente" customPath="/clientes" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          // minHeight: '100vh',
          background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: '800px',
            minHeight: '700px',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            Cadastro do Processo
          </Typography>

          {/* Abas de Navegação */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
            <Button
              variant="text"
              sx={{ fontWeight: 'bold', color: '#555', padding: '1% 10%' }}
              onClick={() => {
                navigate("/cadastro-clientes");
              }}
            >
              Dados Pessoais
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: 'bold', color: '#555', padding: '1% 10%' }}
              onClick={() => {
                navigate("/cadastro-documentos");
              }}
            >
              Documentos
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: 'bold', color: '#3F4E7A', borderBottom: '2px solid #3F4E7A', padding: '1% 10%' }}
            >
              Processo
            </Button>
          </Box>

          {/* Seção para Processo Incompleto */}
          {incompleteProcessId && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: 'red', mb: 2 }}>
                Processo incompleto. Por favor, envie os documentos para o processo ID: {incompleteProcessId}
              </Typography>
              {documentUploadError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {documentUploadError}
                </Alert>
              )}
              {documentUploadSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {documentUploadSuccess}
                </Alert>
              )}
              <Grid container spacing={2}>
                {/* Contratos */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contratos"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'contratos')} // Atualizado para 'contratos'
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.contratos.length > 0 ? `${uploadedFiles.contratos.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('contratos')} {/* Atualizado para 'contratos' */}
                  <TextField
                    fullWidth
                    label="Status dos Contratos"
                    margin="normal"
                    select
                    value={documentoStatus.contratos} // Atualizado para 'contratos'
                    onChange={(e) => handleDocumentStatusChange(e, 'contratos')} // Atualizado para 'contratos'
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>

                {/* Procurações */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Procurações"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'procuracoes')}
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.procuracoes.length > 0 ? `${uploadedFiles.procuracoes.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('procuracoes')}
                  <TextField
                    fullWidth
                    label="Status das Procurações"
                    margin="normal"
                    select
                    value={documentoStatus.procuracoes}
                    onChange={(e) => handleDocumentStatusChange(e, 'procuracoes')}
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>

                {/* Petições Iniciais */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Petições Iniciais"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'peticoesIniciais')}
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.peticoesIniciais.length > 0 ? `${uploadedFiles.peticoesIniciais.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('peticoesIniciais')}
                  <TextField
                    fullWidth
                    label="Status das Petições Iniciais"
                    margin="normal"
                    select
                    value={documentoStatus.peticoesIniciais}
                    onChange={(e) => handleDocumentStatusChange(e, 'peticoesIniciais')}
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>

                {/* Documentos Complementares */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Documentos Complementares"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'documentosComplementares')}
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.documentosComplementares.length > 0 ? `${uploadedFiles.documentosComplementares.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('documentosComplementares')}
                  <TextField
                    fullWidth
                    label="Status dos Documentos Complementares"
                    margin="normal"
                    select
                    value={documentoStatus.documentosComplementares}
                    onChange={(e) => handleDocumentStatusChange(e, 'documentosComplementares')}
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: '#3F4E7A',
                  ':hover': { backgroundColor: '#2F3C5E' },
                  fontWeight: 'bold',
                  borderRadius: 8,
                  padding: '10px',
                }}
                onClick={retryUploadDocuments}
                disabled={documentUploadLoading}
              >
                {documentUploadLoading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Documentos'}
              </Button>
            </Box>
          )}

          {/* Formulário de Cadastro de Processo */}
          {!incompleteProcessId && (
            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Número do Processo"
                name="numeroProcesso"
                value={processoInfo.numeroProcesso}
                onChange={handleInputChange}
                margin="normal"
                placeholder="PRO.0010891"
                required
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tipo de Processo"
                    name="tipoProcesso"
                    value={processoInfo.tipoProcesso}
                    onChange={handleInputChange}
                    margin="normal"
                    select
                    required
                  >
                    <MenuItem value="Civil">Civil</MenuItem>
                    <MenuItem value="Trabalhista">Trabalhista</MenuItem>
                    <MenuItem value="Criminal">Criminal</MenuItem>
                    <MenuItem value="Remoto">Remoto</MenuItem>
                    {/* Adicione mais opções conforme necessário */}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tipo de Atendimento"
                    name="tipoAtendimento"
                    value={processoInfo.tipoAtendimento}
                    onChange={handleInputChange}
                    margin="normal"
                    select
                    required
                  >
                    <MenuItem value="Presencial">Presencial</MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
                    {/* Adicione mais opções conforme necessário */}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de Início"
                    name="dataInicio"
                    value={processoInfo.dataInicio}
                    onChange={handleInputChange}
                    margin="normal"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de Atualização"
                    name="dataAtualizacao"
                    value={processoInfo.dataAtualizacao}
                    onChange={handleInputChange}
                    margin="normal"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Status do Processo"
                    name="status"
                    value={processoInfo.status}
                    onChange={handleInputChange}
                    margin="normal"
                    select
                    required
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              {/* Documentos */}
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', mt: 4 }}>
                Carregar Documentos
              </Typography>
              <Grid container spacing={2}>
                {/* Contratos */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contratos"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'contratos')} // Atualizado para 'contratos'
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.contratos.length > 0 ? `${uploadedFiles.contratos.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('contratos')} {/* Atualizado para 'contratos' */}
                  <TextField
                    fullWidth
                    label="Status dos Contratos"
                    margin="normal"
                    select
                    value={documentoStatus.contratos} // Atualizado para 'contratos'
                    onChange={(e) => handleDocumentStatusChange(e, 'contratos')} // Atualizado para 'contratos'
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>

                {/* Procurações */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Procurações"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'procuracoes')}
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.procuracoes.length > 0 ? `${uploadedFiles.procuracoes.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('procuracoes')}
                  <TextField
                    fullWidth
                    label="Status das Procurações"
                    margin="normal"
                    select
                    value={documentoStatus.procuracoes}
                    onChange={(e) => handleDocumentStatusChange(e, 'procuracoes')}
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>

                {/* Petições Iniciais */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Petições Iniciais"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'peticoesIniciais')}
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.peticoesIniciais.length > 0 ? `${uploadedFiles.peticoesIniciais.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('peticoesIniciais')}
                  <TextField
                    fullWidth
                    label="Status das Petições Iniciais"
                    margin="normal"
                    select
                    value={documentoStatus.peticoesIniciais}
                    onChange={(e) => handleDocumentStatusChange(e, 'peticoesIniciais')}
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>

                {/* Documentos Complementares */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Documentos Complementares"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton component="label">
                          <UploadFileOutlinedIcon />
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleFileUpload(e, 'documentosComplementares')}
                          />
                        </IconButton>
                      ),
                    }}
                    placeholder={uploadedFiles.documentosComplementares.length > 0 ? `${uploadedFiles.documentosComplementares.length} arquivos selecionados` : 'Nenhum arquivo selecionado'}
                  />
                  {renderFileList('documentosComplementares')}
                  <TextField
                    fullWidth
                    label="Status dos Documentos Complementares"
                    margin="normal"
                    select
                    value={documentoStatus.documentosComplementares}
                    onChange={(e) => handleDocumentStatusChange(e, 'documentosComplementares')}
                  >
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              {/* Botão Final */}
              <Button
                // fullWidth
                variant="contained"
                sx={{
                  width: '40%',
                  ml: '60%',
                  mt: 4,
                  backgroundColor: '#3F4E7A',
                  ':hover': { backgroundColor: '#2F3C5E' },
                  fontWeight: 'bold',
                  borderRadius: 8,
                  padding: '10px',
                }}
                type="submit"
                disabled={loading || documentUploadLoading} // Desativa o botão enquanto estiver carregando
              >
                {loading ? 'Processando...' : 'Cadastrar Novo Cliente e Processo'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CadastroProcessos;
