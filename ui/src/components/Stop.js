import React from 'react'
import { PropTypes } from 'prop-types'

class Stop extends React.Component {
    constructor({ name, route, coordinate }) {
        super();
        this.name = name;
        this.route = route;
        this.coordinate = coordinate;
    }

    render() {
        return (
            <li>
                <p>{this.name}</p>
                <p>{this.route}</p>
            </li>
        )
    }
}

Stop.propTypes = {
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Stop
