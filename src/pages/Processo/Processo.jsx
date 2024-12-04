import { useNavigate, useParams, useLocation } from "react-router-dom"

export default function Processo(){
    const location = useLocation();
    // const navigate = useNavigate();
    const { processo } = location.state || {}; //desestruturação
    console.log(processo)
    
    return(
                <div>
                    <h2>olá</h2>
                    <h3>{processo.numero}</h3>
                </div>
        
    )
}