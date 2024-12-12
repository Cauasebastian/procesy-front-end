import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { 
    ArrowBack as ArrowBackIcon, 
    FilterList as FilterListIcon, 
    Add as AddIcon, 
    PersonAdd as PersonAddIcon, 
    MoreVert as MoreVertIcon 
} from '@mui/icons-material'; // Importa ícones diretamente do Material-UI
import { Header } from '../../components/Header';
import styles from "./style.module.css";
import axios from 'axios'; // Certifique-se de ter o axios instalado

export default function Processos(){
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [processos, setProcessos] = useState([]); // Estado para armazenar os processos
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL não está definido.");
      }

    useEffect(() => {
        // Função para obter os processos do backend
        const fetchProcessos = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token'); // Obtém o token do localStorage
                if (!token) {
                    throw new Error('Autenticação necessária. Por favor, faça login novamente.');
                }

                const response = await axios.get(`${API_BASE_URL}/advogado/processos`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setProcessos(response.data); // Assume que response.data é um array de ProcessoDTO
            } catch (err) {
                console.error('Erro ao obter processos:', err);
                setError(err.response?.data?.mensagem || err.message || 'Erro ao obter processos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProcessos();
    }, []);

    function redirectToDetails(processo){
        navigate(`/processo/${processo.id}`, { state: { processo }, replace: false});
    }

    // Função para filtrar os processos com base no termo de pesquisa
    const filteredProcessos = processos.filter(processo => 
        processo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.tipoProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.codProcesso?.toLowerCase().includes(searchTerm.toLowerCase()) // Verifique se codProcesso existe
    ); 

    // Função para determinar a cor do Chip baseado no status
    const getStatusChipColor = (status) => {
        switch(status.toLowerCase()) {
            case 'concluído':
                return { backgroundColor: '#D4EDDA', color: '#155724' }; // Verde claro
            case 'em andamento':
                return { backgroundColor: '#FFF3CD', color: '#856404' }; // Amarelo claro
            case 'pendente':
                return { backgroundColor: '#F8D7DA', color: '#721C24' }; // Vermelho claro
            default:
                return { backgroundColor: '#E2E3E5', color: '#6C757D' }; // Cinza
        }
    };

    return(
        <div className={styles.container}>
            <Header />
            {/* Botão de Voltar */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, margin: 8 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/menu')}
                    sx={{ backgroundColor: '#454B60', minWidth: '52px', height: '52px', borderRadius: '3px' }}
                >
                    <ArrowBackIcon />
                </Button>
                <Typography variant="h4" sx={{ ml: 2 }}>
                    Processos
                </Typography>
            </Box>

            {/* Barra de Pesquisa */}
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", mb: 2, marginTop: 4}}>
                <TextField
                    label="Cliente, número do processo, ação..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    sx={{ 
                        width: '40%', 
                        '& .MuiOutlinedInput-root': {
                            borderTopRightRadius: '0px',
                            borderBottomRightRadius: '0px',
                        }
                    }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => console.log('Pesquisar')} // Você pode implementar a funcionalidade de pesquisa aqui
                    sx={{  
                        ml: 0, 
                        backgroundColor: '#454B60', 
                        height: '56px', 
                        borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px'
                    }} 
                >
                    Pesquisar
                </Button>
            </Box> 

            {/* Botões de Ação */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4, width: '50%', margin: '0 auto' }}>
                <Button 
                    variant="contained"
                    sx={{ mr: 4, backgroundColor: '#454B60', minWidth: '52px', height: '52px' }}
                    onClick={() => navigate('/novo-processo')}
                    endIcon={<AddIcon />}
                >
                    Novo Processo
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ mr: 4, backgroundColor: '#454B60', minWidth: '52px', height: '52px' }} 
                    onClick={() => navigate('/novo-cliente')}
                    endIcon={<PersonAddIcon />}
                >
                    Novo Cliente
                </Button>
                <IconButton 
                    sx={{ backgroundColor: '#454B60', color: 'white', minWidth: '52px', height: '52px', borderRadius: '3px' }}
                    onClick={() => console.log('Filtro')} // Você pode implementar a funcionalidade de filtro aqui
                >
                    <FilterListIcon />
                </IconButton>
            </Box>

            {/* Indicadores de Carregamento e Erro */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}

            {/* Lista de Processos */}
            <div className={styles.container_cards}>
                {filteredProcessos.length === 0 && !loading && !error && (
                    <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                        Nenhum processo encontrado.
                    </Typography>
                )}
                {filteredProcessos.map((processo) => (
                    <Card  
                        key={processo.id} // Use um identificador único, preferencialmente 'id'
                        onClick={() => redirectToDetails(processo)}
                        className={styles.card_processo}
                        sx={{ cursor: 'pointer', mb: 2 }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip 
                                label={processo.status} 
                                sx={{ 
                                    ...getStatusChipColor(processo.status), 
                                    fontSize: '12px', 
                                    borderRadius: '4px' 
                                }} 
                            />
                            <IconButton aria-label="settings">
                                <MoreVertIcon sx={{ color: '#AAAAAA' }} />
                            </IconButton>
                        </Box>
                        <CardContent className={styles.card_content}>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Número do Processo
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.numeroProcesso}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Cliente
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.cliente.nome}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Data de Início
                                </Typography>
                                <Typography className={styles.value}>
                                    {new Date(processo.dataInicio).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Data de Atualização
                                </Typography>
                                <Typography className={styles.value}>
                                    {new Date(processo.dataAtualizacao).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Tipo de Processo
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.tipoProcesso}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Tipo de Atendimento
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.tipoAtendimento}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}