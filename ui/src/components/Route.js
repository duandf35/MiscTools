import React from 'react'
import { PropTypes } from 'prop-types'
import styles from 'spectre.css/dist/spectre.css'

const Route = ({ selected, routeId, longName }) => (
    <li className={styles['card']}>
        <div className={styles['card-header']}>
            <p className={[styles['card-title'], styles['text-primary']].join(' ')}>{routeId}</p>
            <p className={styles['card-subtitle']}>{longName}</p>
        </div>
    </li>
);

Route.propTypes = {
    selected: PropTypes.bool.isRequired,
    routeId: PropTypes.string.isRequired,
    longName: PropTypes.string.isRequired
};

export default Route
