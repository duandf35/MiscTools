import React from 'react'
import { PropTypes } from 'prop-types'

class Stop extends React.Component {
    constructor({ name, route, trip, headSign, arrival, departure, coordinate }) {
        super();
        this.name = name;
        this.route = route;
        this.trip = trip;
        this.headSign = headSign;
        this.arrival = arrival;
        this.departure = departure;
        this.coordinate = coordinate;
    }

    render() {
        return (
            <li>
                <p>{this.name}</p>
                <p>{this.route}</p>
                <p>{this.trip}</p>
                <p>{this.headSign}</p>
                <p>{this.arrival}</p>
                <p>{this.departure}</p>
            </li>
        )
    }
}

Stop.propTypes = {
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    trip: PropTypes.string.isRequired,
    headSign: PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Stop
