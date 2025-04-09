import logo from "../../assets/logo.png"
import imgProfile from "../../assets/profile.svg"
import { useNavigate } from "react-router-dom";
import * as S from './styles'

export function Header(){
    const navigate = useNavigate();
    return (
        <S.ContainerHeader>
           
            <img src={logo} style={{cursor: 'pointer'}} onClick={() => {
                navigate("/menu")
            }}/>
            <img src={imgProfile} />
        </S.ContainerHeader>
    )
}