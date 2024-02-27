
import { fontSize } from '../../../types';
import styles from './google-icon.module.css';

interface SSIconProps {
    children?: React.ReactNode;
    size?: fontSize;
}

const SSGoogleIcon: React.FC<SSIconProps> = ({ children, size = "base" }) => {
    return (
        <>
            <span className={`material-symbols-outlined ${styles[size]}`}>{children}</span>
        </>
    )
}

export default SSGoogleIcon;