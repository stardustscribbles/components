
import { fontSize, intent } from '../../../types';
import styles from './text.module.css';

export interface TextProps {
    children?: React.ReactNode;
    intent?: intent;
    size?: fontSize;
}

const SSText: React.FC<TextProps> = ({ children, size = "base", intent = "neutral" }) => {
    return (
        <>
            <p className={`${styles[size]} ${styles[intent]}`}>{children}</p>
        </>
    )
}

export default SSText;