import React from 'react'
import spectre from 'spectre.css/dist/spectre.css'
import styles from './styles.css'

export const btnBackground = (selected) => {
    if (selected) {
        return ''
    }

    return spectre['toast-primary'];
};

export const btnClicked = (selected) => {
    let anchor = { textDecoration: 'none', display: 'block', textAlign: 'center' };

    if (selected) {
        anchor['pointerEvents'] = 'none'
    }

    return anchor;
};

export const inProgress = (selected) => {
    if (!!selected) {
        return (
            <div className={styles['spinner']}>
                <div className={styles['bounce1']}/>
                <div className={styles['bounce2']}/>
                <div className={styles['bounce3']}/>
            </div>
        )
    }
};
