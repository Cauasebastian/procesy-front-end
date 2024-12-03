import styles from "./style.module.css"
import logo from "../../assets/logo.svg"
import imgProfile from "../../assets/profile.svg"
import { FaBars } from "react-icons/fa";

export function Header(){
    return (
        <header className={styles.container_header}>
            <FaBars className={styles.icon}/>
            <img src={logo}/>
            <img src={imgProfile} />
        </header>
    )
}