import React from 'react'
import { PropTypes } from 'prop-types'
import spectre from 'spectre.css/dist/spectre.css'
import { background, anchor} from '../styles';

const Stop = ({ onClick, selected, stopName, stopId, coordinate }) => (
    <li className={[spectre['toast'], background(selected)].join(' ')}>
        <a style={anchor(selected)} onClick={e => {
            e.preventDefault();
            onClick();
        }}>
            <div>
                <h5>{stopId}</h5>
                {stopName}
            </div>
        </a>
    </li>
);

Stop.propTypes = {
    selected: PropTypes.bool.isRequired,
    stopName: PropTypes.string.isRequired,
    coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Stop
