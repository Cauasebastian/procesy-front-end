import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import styles from "./style.module.css"

export function InputSearch(){
    return(
        <div>
            <TextField id="outlined-textarea"  placeholder="Nome do cliente..." multiline sx={{
                width: 400,
            }}/>
            <Button
                        variant="contained"
                        sx={{
                            flex: 1,
                            backgroundColor: '#3F4E7A',
                            color: '#fff',
                            textTransform: 'none',
                            height: 56,
                            gap: "1rem",
                            fontSize: '1rem',
                        }}
                >
                            Pesquisar
                    </Button>
        </div>
    )
}