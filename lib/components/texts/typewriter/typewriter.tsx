import { fontSize, intent } from '../../../types';
import SSText from '../text/text';
import styles from './typewriter.module.css';

export interface TypewriterProps {
    children?: React.ReactNode;
    intent?: intent;
    size?: fontSize;
}

const SSTypewriter: React.FC<TypewriterProps> = ({ children, size = "base", intent = "neutral" }) => {
    return (
        <>
            <div className={`${styles['typewriter']} ${styles[size]} ${styles[intent]}`}>
                <SSText size={size} intent={intent}>{children}</SSText>
            </div>
        </>
    )
}

export default SSTypewriter;