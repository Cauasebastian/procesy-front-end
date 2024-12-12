import processos from "../../mocks/processos.json"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { ArrowBackIcon, MoreVertIcon, FilterListIcon, AddIcon, PersonAddIcon } from '../../components/Icons/icons.js';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from "./style.module.css"
import { Header } from '../../components/Header'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

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
    console.log(processos);
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
                {processos.map((processo) => (
                    // ajustar o css dos cartões individuais de cada processo
                    <Card  
                        key={processo.numero} 
                        onClick={() => redirectToDetails(processo)}
                        sx={{
                            cursor: "pointer"
                        }}>
                        <CardHeader action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }/>
                        <div className={styles.card_processo}>
                            {/* Div para o número do processo */}
                            <div>
                                <Typography className={styles.title_atribute}>
                                    Número
                                </Typography>
                                <Typography>
                                    {processo.numero}
                                </Typography>
                            </div>
                            {/* Div para a data de status */}
                            <div>
                                <Typography className={styles.title_atribute}>
                                    Cliente
                                </Typography>
                                <Typography>
                                    {processo.cliente.nome}
                                </Typography>
                            </div>
                           {/* Div para o código do processo */}
                            <div>
                                <Typography className={styles.title_atribute}>
                                    Data Status
                                </Typography>
                                <Typography>
                                    {processo.dataStatus}
                                </Typography>
                            </div>
                            {/* Div para o código do processo */}
                            <div>
                                <Typography className={styles.title_atribute}>
                                    N° Processo
                                </Typography>
                                <Typography>
                                    {processo.codProcesso}
                                </Typography>
                            </div>
                            {/* Div para a ação */}
                            <div>
                                <Typography className={styles.title_atribute}>
                                    Ação
                                </Typography>
                                <Typography>
                                    {processo.acao}
                                </Typography>
                            </div>
                            {/* Div para o status */}
                            <div>
                                <Typography className={styles.title_atribute}>
                                    Status
                                </Typography>
                                <Typography>
                                    {processo.status}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
        
        
    )
}