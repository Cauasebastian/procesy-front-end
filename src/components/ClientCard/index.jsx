import styles from "./style.module.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";


export function ClientCard({nome, id}){
    return(
        <div className={styles.container}>
            <div>
                <p>{nome}</p>
                <p>{id}</p>
            </div>
            <PiDotsThreeOutlineVerticalFill/>
        </div>
    )
}