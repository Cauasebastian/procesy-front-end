import TextField from '@mui/material/TextField';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Card from '@mui/material/Card';
import styles from "./style.module.css"

export function SectionProcessos({processo}){
    return(
        <div>
            <h2>Processos</h2>
            <h3>Documentos pessoais</h3>
            <div>
                <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                />
                <FilterListRoundedIcon/>
            </div>
            <div className={styles.div_cards}>
                    <Card >
                         <p>{processo.status}</p>
                         <section>
                            <span>Ação</span>
                            <p>{processo.acao}</p>
                         </section>
                         <section>
                            <span>N° Processo</span>
                            <p>{processo.codProcesso}</p>
                         </section>
                    </Card>
                   
               
            </div>
            <hr />
        </div>
    )
}