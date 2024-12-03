import styles from "./style.module.css"
import logo from "../../assets/logo.svg"
import imgProfile from "../../assets/profile.svg"
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Header(){
    const navigate = useNavigate();
    return (
        <header className={styles.container_header}>
            <FaBars className={styles.icon}/>
            <img className={styles.logo} src={logo} onClick={() => {
                navigate("/menu")
            }}/>
            <img src={imgProfile} />
        </header>
    )
}