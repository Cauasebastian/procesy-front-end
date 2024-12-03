import { Button } from "@mui/material"
import styles from "./style.module.css"

export function TextField(){
    return(
        <div>
            <input type="text" className={styles.input_field} placeholder="Cliente, número do processo"/>
            <Button
                        variant="contained"
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
                            Pesquisar
                    </Button>
        </div>
    )
}