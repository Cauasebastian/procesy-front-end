import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import processos from "../../mocks/processos.json";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { ArrowBackIcon, FilterListIcon, AddIcon, PersonAddIcon, MoreVertIcon } from '../../components/Icons/icons.js'; // Importa os ícones do arquivo icons.js
import { Header } from '../../components/Header';
import styles from "./style.module.css";

export default function Processos(){
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    function redirectToDetails(processo){
        navigate(`/processo/${processo.numero}`, { state: { processo }, replace: false})
    }

    // adicionar função para filtrar os dados dos processos om base no termo de pesquisa
    const filteredProcessos = processos.filter(processo => 
        processo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.codProcesso.toLowerCase().includes(searchTerm.toLowerCase())
    ); 
    
    return(
        <div className={styles.container}>
            <Header />
            {/* Botão de Voltar q eu esqueciii */}
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
                    onClick={() => console.log('Pesquisar')}
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
                <Box sx={{ display: 'center', justifyContent: 'center', mb: 4, width: '50%', margin: '0 auto' }}>
                    <Button 
                        variant="contained"
                        sx={{ mr: 4, backgroundColor: '#454B60', minWidth: '52px', height: '52px' }}
                        onClick={() => navigate('/novo-processo')}
                        endIcon={<AddIcon />}
                        padding="6px 26px"
                    >
                        Novo Processo
                    </Button>
                    <Button 
                        variant="contained" 
                        sx={{ mr: 4, backgroundColor: '#454B60', minWidth: '52px', height: '52px' }} 
                        onClick={() => navigate('/novo-cliente')}
                        endIcon={<PersonAddIcon />}
                        padding="6px 26px"
                    >
                        Novo Cliente
                    </Button>
                    <IconButton 
                        sx={{ backgroundColor: '#454B60', color: 'white', minWidth: '52px', height: '52px', borderRadius: '3px' }}
                        onClick={() => console.log('Filtro')}
                    >
                        <FilterListIcon />
                    </IconButton>
                </Box>

            {/*<h2 className={styles.title_page} onClick={() => console.log("olá")}>Processos</h2>*/}
            <div className={styles.container_cards}>
                {filteredProcessos.map((processo) => (
                    <Card  
                        key={processo.numero} 
                        onClick={() => redirectToDetails(processo)}
                        className={styles.card_processo}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip 
                                label="Ativo" 
                                sx={{ 
                                    backgroundColor: '#DFF6E0', 
                                    color: '#228B22', 
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
                                    Número
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.numero}
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
                                    Data Status
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.dataStatus}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    N° Processo
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.codProcesso}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Ação
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.acao}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.title_atribute}>
                                    Status
                                </Typography>
                                <Typography className={styles.value}>
                                    {processo.status}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        
        
    )
}