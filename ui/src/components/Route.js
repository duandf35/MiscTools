import React from 'react'
import { PropTypes } from 'prop-types'

const Route = ({ selected, routeId, longName }) => (
    <li>
        <p>{routeId}</p>
        <p>{longName}</p>
    </li>
);

Route.propTypes = {
    selected: PropTypes.bool.isRequired,
    routeId: PropTypes.string.isRequired,
    longName: PropTypes.string.isRequired
};

export default Route
