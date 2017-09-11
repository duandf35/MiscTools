import React from 'react'
import { PropTypes } from 'prop-types'
import spectre from 'spectre.css/dist/spectre.css'
import { background, anchor } from '../styles';

const Route = ({ onClick, selected, routeId, longName }) => (
    <li className={[spectre['toast'], background(selected)].join(' ')}>
        <a style={anchor(selected)} onClick={e => {
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

Route.propTypes = {
    selected: PropTypes.bool.isRequired,
    routeId: PropTypes.string.isRequired,
    longName: PropTypes.string.isRequired
};

export default Route
