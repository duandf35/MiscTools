import React from 'react'
import { PropTypes } from 'prop-types'
import styles from 'spectre.css/dist/spectre.css'

const Route = ({ onClick, selected, routeId, longName }) => (
    <li className={[styles['toast'], getBgColor(selected)].join(' ')}>
        <a style={{textDecoration: 'none'}} onClick={e => {
            e.preventDefault();
            onClick();
        }}>
            <div>
                <h3>{routeId}</h3>
                {longName}
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

Route.propTypes = {
    selected: PropTypes.bool.isRequired,
    routeId: PropTypes.string.isRequired,
    longName: PropTypes.string.isRequired
};

export default Route
