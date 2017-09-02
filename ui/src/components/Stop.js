import React from 'react'
import { PropTypes } from 'prop-types'

const Stop = ({ selected, stopId, routeId, stopName, coordinate }) => (
    <li>
        <p>{{stopId}}</p>
        <p>{{routeId}}</p>
        <p>{{stopName}}</p>
        <p>{{coordinate}}</p>
    </li>
);

Stop.propTypes = {
    selected: PropTypes.bool.isRequired,
    stopId: PropTypes.string.isRequired,
    routeId: PropTypes.string.isRequired,
    stopName: PropTypes.string.isRequired,
    coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Stop
