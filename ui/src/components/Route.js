import React from 'react'
import { PropTypes } from 'prop-types'

class Route extends React.Component {
    constructor({ routeId, name }) {
        super();
        this.routeId = routeId;
        this.name = name;
    }

    render() {
        return (
            <li>
                <p>{this.routeId}</p>
                <p>{this.name}</p>
            </li>
        )
    }
}

Route.propTypes = {
    routeId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Route
