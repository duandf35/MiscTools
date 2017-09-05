import React from 'react'
import { PropTypes } from 'prop-types'
import styles from 'spectre.css/dist/spectre.css'

const Stop = ({ onClick, selected, stopName, coordinate }) => (
    <li className={[styles['toast'], getBgColor(selected)].join(' ')}>
        <a style={{textDecoration: 'none'}} onClick={e => {
            e.preventDefault();
            onClick();
        }}>
            <div>
                <h5>{stopName}</h5>
            </div>
        </a>
    </li>
);

function getBgColor(selected) {
    if (selected) {
        return ''
    } else {
        return styles['toast-primary']
    }
}

Stop.propTypes = {
    selected: PropTypes.bool.isRequired,
    stopName: PropTypes.string.isRequired,
    coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Stop
