import { useLocation } from "react-router-dom"

export default function Processo(){
    const location = useLocation();
    // const navigate = useNavigate();
    const { processo } = location.state || {}; //desestruturação
    
    return(
                <div>
                    <h2>Detalhes do Processo</h2>
                    <h3>Número {processo.numero}</h3>

        
                </div>

                
    )
}