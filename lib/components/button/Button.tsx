import { emphasis, intent, size, state } from "../../types";
// import "./Button.module.scss";
import styles from "./Button.module.css";
export interface SSButtonProps {
    label?: string;
    intent?: intent;
    emphasis?: emphasis;
    size?: size;
    state?: state;
}

const SSButton: React.FC<SSButtonProps> = ({ label, intent = "primary", size = "md", emphasis = "default", state = "enabled" }) => {
    return (
        <>
            <button className={`${styles['button']} ${styles[intent]} ${styles[emphasis]} ${styles[size]} ${styles[state]}`}>{label}</button>
        </>
    )
}

export default SSButton;