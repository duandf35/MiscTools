import React from 'react'
import { PropTypes } from 'prop-types'
import Stop from './Stop'

class StopList extends React.Component {
    constructor({ stops }) {
        super();
        this.stops = stops;
    }

    render() {
        return(
            <ul>
                {this.stops.map(stop => (
                    <Stop key={stop.id} {...stop}/>
                ))}
            </ul>
        )
    }
}

StopList.propTypes = {
    stops: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            route: PropTypes.string.isRequired,
            trip: PropTypes.string.isRequired,
            headSign: PropTypes.string.isRequired,
            arrival: PropTypes.string.isRequired,
            departure: PropTypes.string.isRequired,
            coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
        }).isRequired
    ).isRequired
};

export default StopList
