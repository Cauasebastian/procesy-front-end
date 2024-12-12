import processos from "../../mocks/processos.json"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import styles from "./style.module.css"
import { useNavigate } from 'react-router-dom';
// adicionar imports para o header 

export default function Processos(){
    const navigate = useNavigate();

    function redirectToDetails(processo){
        navigate(`/processo/${processo.numero}`, { state: { processo }, replace: false})
    }

    // adicionar função para filtrar os dados dos processos

    console.log(processos);
    return(
        <div className={styles.container}>
            {/* adicionar o header */}

            {/* Fazer um box de Pesquisa */}
            
            <h2 className={styles.title_page} onClick={() => console.log("olá")}>Processos</h2>
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