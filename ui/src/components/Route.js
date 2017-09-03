import React from 'react'
import { PropTypes } from 'prop-types'
import styles from 'spectre.css/dist/spectre.css'

const Route = ({ onClick, selected, routeId, longName }) => (
    <li className={[styles['card'], getBgColor(selected)].join(' ')}>
        <a style={{textDecoration: 'none'}} onClick={e => {
            e.preventDefault();
            onClick();
        }}>
            <div className={styles['card-header']}>
                <p className={[styles['card-title'], styles['text-primary']].join(' ')}>{routeId}</p>
                <p className={styles['card-subtitle']}>{longName}</p>
            </div>
        </a>
    </li>
);

function getBgColor(selected) {
    if (selected) {
        return styles['bg-dark']
    } else {
        return styles['bg-secondary']
    }
}

Route.propTypes = {
    selected: PropTypes.bool.isRequired,
    routeId: PropTypes.string.isRequired,
    longName: PropTypes.string.isRequired
};

export default Route
