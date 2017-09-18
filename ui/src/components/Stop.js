import React from 'react'
import { PropTypes } from 'prop-types'
import spectre from 'spectre.css/dist/spectre.css'
import { btnBackground, btnClicked, inProgress} from '../styles';

const Stop = ({ onClick, selected, stopName, stopId, coordinate }) => (
    <li className={[spectre['toast'], btnBackground(selected)].join(' ')}>
        <a style={btnClicked(selected)} onClick={e => {
            e.preventDefault();
            onClick();
        }}>
            <div>
                {inProgress(selected)}
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
