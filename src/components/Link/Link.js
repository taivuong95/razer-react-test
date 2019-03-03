import React from 'react';
import styles from './Link.module.css';

export default props => {
    const {mode = "default", children, ...rest} = props;

    return (
        <a className={styles[mode]} {...rest}>
            {children}
        </a>
    )
}