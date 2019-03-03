import React from 'react';
import "./ReactLink.module.scss";
import styles from './ReactLink.module.scss';

export default props => {
    const {mode = "default", children, ...rest} = props;

    return (
        <a className={styles[mode]} {...rest}>
            {children}
        </a>
    )
}