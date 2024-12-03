import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';


export function ClientCard({nome, id, imagem}){
    return(
        <CardHeader
        sx={{
            background: "#FFF",
            borderRadius: "8px"
        }}
            avatar={
                <Avatar src={imagem}/>
            }
            title={nome}
            subheader={id}
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
        />
        
    )
}