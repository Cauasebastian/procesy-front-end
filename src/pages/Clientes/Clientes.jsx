import { FaCaretSquareLeft } from "react-icons/fa";
import styles from "./style.module.css"
import { Button } from "@mui/material";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { InputSearch } from "../../components/TextField";
import clients from "../../mocks/clients.json"
import { ClientCard } from "../../components/ClientCard";
import { useNavigate } from 'react-router-dom';


export default function Clientes(){
    const navigate = useNavigate();
    return (
        <div className={styles.container_geral}>
            <div className={styles.container_top}>
                <div className={styles.div_title_page} onClick={() => {
                    navigate(-1)
                }}>
                    <FaCaretSquareLeft className={styles.icon}/>
                    <h3 className={styles.title_page}>Clientes</h3>
                </div>
                <InputSearch/>
                <div className={styles.container_buttons}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate("/novo-processo")
                        }}
                        endIcon={<FaPen/>}
                        sx={{
                            flex: 1,
                            backgroundColor: '#3F4E7A',
                            color: '#fff',
                            textTransform: 'none',
                            height: 50,
                            gap: "1rem",
                            fontSize: '1rem',
                        }}
                >
                            Editar
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigate("/novo-processo")
                        }}
                        endIcon={<FaTrash/>}
                        sx={{
                            flex: 1,
                            color: '#FC694D',
                            borderColor: "#FC694D",
                            textTransform: 'none',
                            height: 50,
                            gap: "1rem",
                            fontSize: '1rem',
                        }}
                >
                            Deletar
                    </Button>
                </div>
            </div>
            <div className={styles.container_cards}>
                {clients.map((client) => (
                    <ClientCard nome={client.nome} key={client.id} imagem={client.imgUrl}/>
                ))}
            </div>
        </div>
    )
}