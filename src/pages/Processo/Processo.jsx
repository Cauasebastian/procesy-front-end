import { useLocation } from "react-router-dom"
import { PageBack } from "../../components/PageBack";
import { SectionDocumentos } from "../../components/SectionDocumentos";
import { SectionProcessos } from "../../components/SectionProcessos";

export default function Processo(){
    const location = useLocation();
    // const navigate = useNavigate();
    const { processo } = location.state || {}; //desestruturação
    
    return(
                <div>
                    <PageBack title="Detalhes do Processo"/>
                    <h3>Número {processo.numero}</h3>
                    <SectionDocumentos/>
                    <SectionProcessos processo={processo}/>
        
                </div>

                
    )
}