import logo from "../../assets/logo.png"
import imgProfile from "../../assets/profile.svg"
import { useNavigate } from "react-router-dom";
import * as S from './styles'

export function Header({ customStyles = {} }){
    const navigate = useNavigate();
    return (
        <S.ContainerHeader style={customStyles}>
           
            <img src={logo} style={{cursor: 'pointer'}} onClick={() => {
                navigate("/menu")
                alt="Logo"
            }}/>
            <img src={imgProfile} alt="Perfil" />
        </S.ContainerHeader>
    )
}