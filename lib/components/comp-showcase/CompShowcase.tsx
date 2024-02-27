import React from "react";
import styles from "./CompShowcase.module.css";
import { SSText } from "..";


interface SSCompShowcaseProps {
    children?: React.ReactNode;
    header: string;
}

const SSCompShowcase: React.FC<SSCompShowcaseProps> = ({ children, header }) => {
    return (
        <>
            <div className={`${styles['component-showcase-container']}`}>
                <div className={`${styles['component-showcase-header']}`}>
                    <SSText size="h6">
                        {header}
                    </SSText>
                </div>
                <div className={`${styles['component-showcase-component']}`}>
                    {children}
                </div>
            </div >
        </>
    )
}

export default SSCompShowcase;