import SSGoogleIcon from '../../icons/google-icon/google-icon';
import styles from './card1.module.css';

interface SSCardProps {
    heading?: string;
    description?: string;
    icon?: string;
}

const SSCard1: React.FC<SSCardProps> = ({ heading, description, icon }) => {
    return (
        <>
            <div className={`${styles['card-container']}`}>
                <div className={`${styles['card-heading']}`}>{heading}</div>
                <div className={`${styles['card-description']}`}>{description}</div>
                <div className={`${styles['card-arrow']}`}>
                    {icon ? <SSGoogleIcon size='h4'>{icon}</SSGoogleIcon> : <></>}
                </div>
            </div >
        </>
    )
}

export default SSCard1;