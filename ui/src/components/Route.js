import React from 'react'
import { PropTypes } from 'prop-types'

const Route = ({ selected, shortName, longName }) => (
    <li>
        <p>{shortName}</p>
        <p>{longName}</p>
    </li>
);

Route.propTypes = {
    selected: PropTypes.bool.isRequired,
    shortName: PropTypes.string.isRequired,
    longName: PropTypes.string.isRequired
};

export default Route
