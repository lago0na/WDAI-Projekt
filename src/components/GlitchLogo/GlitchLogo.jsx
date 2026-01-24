
import React from 'react';
import styles from './GlitchLogo.module.css';

const GlitchLogo = ({ text = "VHS_CLUB", className = "", style = {} }) => {
    return (
        <span
            className={`${styles.logo} ${className} main-heading`}
            data-text={text}
            style={style}
        >
            {text}
        </span>
    );
};

export default GlitchLogo;